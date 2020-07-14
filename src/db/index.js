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
  /**
   * Creates an instance of DB.
   * @memberof DB
   */
  constructor () {
    this.connect()
      .then(() => this.createTables())
      .catch((err) => {
        console.log('Constructor err: ', err)
      })
  }

  /**
   * Get shared instance of DB.
   *
   * @static
   * @returns The shared instance of DB.
   * @memberof DB
   */
  static sharedInstance () {
    this.instance = this.instance ? this.instance : new DB()
    return this.instance
  }

  /**
   * Connect to the database.
   *
   * @returns
   * @memberof DB
   */
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

  /**
   * Create tables and insert default data.
   *
   * @returns
   * @memberof DB
   */
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

  /**
   * Close the database.
   *
   * @memberof DB
   */
  close () {
    console.log('Close db')
    this.db.close()
  }

  /**
   * Runs the SQL query with the specified parameters and calls the callback afterwards.
   * It does not retrieve any result data.
   *
   * @param {*} sql
   * @param {*} [params=[]]
   * @returns
   * @memberof DB
   */
  run (sql, params = []) {
    console.log('Running sql: ' + sql + ' params: ' + params)
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

  /**
   * Runs all SQL queries in the supplied string.
   * No result rows are retrieved.
   *
   * @param {*} sql
   * @returns
   * @memberof DB
   */
  exec (sql) {
    console.log('Running sql: ' + sql)
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

  /**
   * Executes the statement and retrieves the first result row.
   *
   * @param {*} sql
   * @param {*} [params=[]]
   * @returns
   * @memberof DB
   */
  get (sql, params = []) {
    console.log('Running sql: ' + sql + ' params: ' + params)
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

  /**
   * Executes the statement and calls the callback with all result rows.
   *
   * @param {*} sql
   * @param {*} [params=[]]
   * @returns
   * @memberof DB
   */
  all (sql, params = []) {
    console.log('Running sql: ' + sql + ' params: ' + params)
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
