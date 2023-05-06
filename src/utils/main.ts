import { screen } from 'electron'
let hasMove = false;

/*
* 主程序相关的工具函数
* */
export function moveSecondScreen(win, bounds={}) {
  // 测试的时候讲窗口放在第二个屏幕上
  const displays = screen.getAllDisplays()
  const primaryDisplay = screen.getPrimaryDisplay()

  // 设置窗口的位置和大小
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== primaryDisplay.bounds.x || display.bounds.y !== primaryDisplay.bounds.y
  })

  // 记录是否移动过
  win.on('move', () => {
    hasMove = true;
  })

  if (externalDisplay && !hasMove) {
    win.setBounds({...externalDisplay.bounds, ...bounds})
  }
}
