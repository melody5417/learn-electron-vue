'use strict'

import { app, BrowserWindow } from 'electron'
import DB from 'src/db/index'
import { WindowManager } from './windowManager'

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
  const options = WindowManager.sharedInstance().getMainCreateOptions()
  mainWindow = new BrowserWindow({
    width: options.width,
    height: options.height,
    minWidth: options.minWidth,
    minHeight: options.minHeight,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true,
      zoomFactor: options.zoomFactor || 1.0 // not work
    }
  })
  mainWindow.identify = options.identify

  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.webContents.setZoomFactor(options.zoomFactor || 1.0)
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
  WindowManager.sharedInstance()

  createWindow()
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
