import { BrowserWindow, screen } from 'electron'

class WindowManager {
  constructor () {
    this._scaleFactor = screen.getPrimaryDisplay().scaleFactor
    this.registerListener()
  }

  registerListener () {
    screen.on('display-metrics-changed', (event, display, changedMetrics) => {
      console.log(
        `display-metrics-changed changedMetrics: ${JSON.stringify(
          changedMetrics
        )}`
      )

      const needUpdate =
        Array.isArray(changedMetrics) && changedMetrics.includes('scaleFactor')
      if (!needUpdate) return

      this.handleScaleFactorChanged(display, changedMetrics)
    })
  }

  getScaleFactor () {
    return this._scaleFactor
  }

  /**
   * 系统缩放系数 * 页面缩放系数 = 1
   *
   * @returns 根据系统缩放系数计算前端界面缩放比例
   */
  getZoomFactor () {
    const dpr = window.devicePixelRatio || 1
    // const currentZoom = +document.body.style.zoom;
    const zoom = (1 / dpr).toFixed(2)
    // if (currentZoom.toFixed(2) !== zoom.toFixed(2)) {
    //   document.body.style.zoom = zoom.toFixed(2);
    // }
    return zoom
  }

  /**
   * 窗体大小 = MAX(系数为1时窗体大小 * 系统缩放系数， 当前所在屏幕大小)
   *
   * @param {Number} width 系统缩放系数为1时，窗体宽度
   * @param {Number} height 系统缩放系数为1时，窗体高度
   * @returns 适配缩放的窗体大小
   */
  getWindowSize (width, height) {
    return { width, height }
  }

  handleScaleFactorChanged (display, changedMetrics) {
    // 理想应该是遍历所有窗体，然后根据所在的display设置新的windowsize
    BrowserWindow.getAllWindows().forEach(win => {
      const screen = getScreenFromWindow(win)
      if (screen.id !== display.id) return
      const screenBounds = display.bounds // 1-> 200% { x: 0, y: 0, width: 1280, height: 700 }
      const winBounds = win.getBounds() // 1-> 200% { x: 565, y: 250, width: 150, height: 200 }
      console.log('handleScaleFactorChanged 1', screenBounds, winBounds)
      const minWidth = 1920 / display.scaleFactor
      const minHeight = 1080 / display.scaleFactor

      // 这个要统一管理，每种类型窗体的值统一定义
      win.setMinimumSize(minWidth, minHeight)
      console.log('handleScaleFactorChanged 2', minWidth, minHeight)

      let needUpdate = false
      if (winBounds.width > screenBounds.width) {
        needUpdate = true
        winBounds.x = screenBounds.x
        winBounds.width = screenBounds.width
      }
      if (winBounds.height > screenBounds.height) {
        needUpdate = true
        winBounds.y = screenBounds.y
        winBounds.height = screenBounds.height
      }
      if (needUpdate) {
      }
      console.log('handleScaleFactorChanged 3', screenBounds, winBounds)
      setTimeout(() => {
        win.setBounds(winBounds)
      }, 100)
    })
  }
}

const manager = new WindowManager()
console.log(manager)

function getScreenFromWindow (win) {
  const winBounds = win.getBounds()
  const distScreen = screen.getDisplayNearestPoint({
    x: winBounds.x,
    y: winBounds.y
  })
  return distScreen
}
