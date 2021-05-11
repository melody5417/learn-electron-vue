'use strict'

import { app, BrowserWindow } from 'electron'
import DB from 'src/db/index'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

app.allowRendererProcessReuse = true

let mainWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/page1.html`
    : `file://${__dirname}/page1.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1920,
    minHeight: 1080,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true
      // zoomFactor: zoomLevelToZoomFactor(windowSettings?.zoomLevel),
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('will-resize', event => {
  console.log('will-resize', event)
})

app.on('ready', () => {
  DB.sharedInstance()
  createWindow()
  require('./windowManager')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
