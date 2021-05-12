import { BrowserWindow, screen } from 'electron'

const MAIN_WINDOW_OPTION = {
  identify: 'MAIN',
  width: 1920,
  height: 1080,
  minwidth: 1920,
  minheight: 1080
}
export class WindowManager {
  constructor () {
    this.registerListener()
  }

  static sharedInstance () {
    this.instance = this.instance ? this.instance : new WindowManager()
    return this.instance
  }

  registerListener () {
    screen.on('display-metrics-changed', (event, display, changedMetrics) => {
      const needModifyBounds =
        Array.isArray(changedMetrics) && changedMetrics.includes('scaleFactor')
      if (!needModifyBounds) return

      this.handleScaleFactorChanged(display, changedMetrics)
    })
  }

  getWindowOptions (identify) {
    if (identify === MAIN_WINDOW_OPTION.identify) {
      return MAIN_WINDOW_OPTION
    }
    return {}
  }

  getMainCreateOptions (display) {
    let options = Object.assign(
      {},
      this.getWindowOptions(MAIN_WINDOW_OPTION.identify)
    )
    let validDisplay = display || screen.getPrimaryDisplay()
    options.zoomFactor = getZoomFactor(validDisplay) || 1.0
    return options
  }

  handleScaleFactorChanged (display) {
    BrowserWindow.getAllWindows().forEach(win => {
      const screen = getScreenFromWindow(win)
      if (screen.id !== display.id) return

      const screenBounds = display.bounds
      const winBounds = win.getBounds()

      const options = this.getWindowOptions(win.identify)
      if (!options) return

      // reset minwidth and minheight
      const minwidth = parseInt(options.minwidth / display.scaleFactor)
      const minheight = parseInt(options.minheight / display.scaleFactor)
      win.setMinimumSize(minwidth, minheight)

      // reset zoom factor
      const zoomFactor = getZoomFactor(display)
      win.webContents.setZoomFactor(zoomFactor)

      // modify win bounds to ensure not exceed the screen boundary
      let needModifyBounds = false
      if (winBounds.width > screenBounds.width) {
        needModifyBounds = true
        winBounds.x = screenBounds.x
        winBounds.width = screenBounds.width
      }
      if (winBounds.height > screenBounds.height) {
        needModifyBounds = true
        winBounds.y = screenBounds.y
        winBounds.height = screenBounds.height
      }

      if (needModifyBounds) {
        setTimeout(() => {
          win.setBounds(winBounds)
        }, 1)
      }
    })
  }
}

/**
 * Get screen based on the center point of win
 *
 * @param { BrowserWindow } win
 * @returns { Screen }
 */
function getScreenFromWindow (win) {
  const winBounds = win.getBounds()
  const distScreen = screen.getDisplayNearestPoint({
    x: winBounds.x + winBounds.width / 2.0,
    y: winBounds.y + winBounds.height / 2.0
  })
  return distScreen
}

/**
 * Screen Scale Factor * Render Zoom Factor = 1
 *
 * @returns { Number }
 */
function getZoomFactor (display) {
  const dpr = display.scaleFactor || 1
  const zoom = parseFloat((1 / dpr).toFixed(2))
  return zoom
}
