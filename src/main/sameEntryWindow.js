import { BrowserWindow } from 'electron'

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/index.html#/same-entry-page`
  : `file://${__dirname}/index.html`

// eslint-disable-next-line no-unused-vars
let window = null

function createWindow () {
  window = new BrowserWindow({
    width: 300,
    height: 400,
    title: 'Same Entry Window',
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true // Electron升级到5.0以上之后，在创建窗口的时候需要手动开启node集成
    }
  })
  window.loadURL(winURL)

  window.on('closed', function () {
    window = null
  })
}

function showWindow () {
  if (window === null) {
    createWindow()
  }

  window.show()
  window.focus()
}

export default showWindow
