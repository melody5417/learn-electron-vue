import { app, remote } from 'electron'
import fs from 'fs-extra'
import path from 'path'
import sqlite3 from 'sqlite3'
import pkg from '../../package.json'

const sqlite = process.env.NODE_ENV === 'development' ? sqlite3.verbose() : sqlite3

const APP = process.type === 'renderer' ? remote.app : app
const STORE_PATH = APP.getPath('userData')
if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH)
  }
}
const DB_PATH = path.join(STORE_PATH, `/${pkg.name}.db`)
console.log('db: ', DB_PATH)

class DB {
  constructor () {
    this.connect()
      .then(() => this.createTables())
      .catch((err) => {
        console.log('Constructor err: ', err)
      })
  }

  static sharedInstance () {
    this.instance = this.instance ? this.instance : new DB()
    return this.instance
  }

  connect () {
    return new Promise((resolve, reject) => {
      this.db = new sqlite.Database(DB_PATH, (err) => {
        if (err) {
          console.log('Could not connect to db: ' + DB_PATH + ' err: ' + err)
          reject(err)
        } else {
          console.log('Connected to db: ', DB_PATH)
          resolve()
        }
      })
    })
  }

  createTables () {
    return new Promise((resolve, reject) => {
      const filePath = path.join(__dirname, '/sqlite.sql')
      fs.readFile(filePath, 'utf-8').then((sql, err) => {
        if (err) {
          console.log('Readfile err: ', err)
          reject(err)
        } else {
          this.exec(sql)
            .then(() => resolve())
            .catch((err) => reject(err))
        }
      })
    })
  }

  close () {
    console.log('Close db')
    this.db.close()
  }

  run (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err) => {
        if (err) {
          console.log('Error running sql: ' + sql + ' params: ' + params)
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  exec (sql) {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err) => {
        if (err) {
          console.log('Error running sql: ', sql)
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  get (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, data) => {
        if (err) {
          console.log('Error running sql: ' + sql + ' params: ' + params)
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  all (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, data) => {
        if (err) {
          console.log('Error running sql: ' + sql + ' params: ' + params)
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}

export default DB
