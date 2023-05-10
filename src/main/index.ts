import {app, BrowserWindow, Notification, ipcMain, Tray, Menu, screen, globalShortcut} from 'electron';
import {is, moveSecondScreen} from '@utils';
import createMainWindow from './mainWindow'
import createSearchWindow from './searchWindow'


async function start(app){
  await app.whenReady()
  // 开发环境，调试使用
  if(is.dev){
    const searchWindowFn = async function(){
      const searchWindow = await createSearchWindow(app)
      moveSecondScreen(searchWindow);
      searchWindow.webContents.openDevTools({mode: 'undocked'});
      searchWindow.removeAllListeners('blur')
    }

    const mainWindowFn = async () => {
      const mainWindow = await createMainWindow(app)
      moveSecondScreen(mainWindow);
      mainWindow.webContents.openDevTools({mode: 'bottom'});
    };
    await Promise.all([
      mainWindowFn(),
      searchWindowFn()
    ])

  } else {
    createMainWindow(app)
    createSearchWindow(app)
  }
}

// 单程序实例
function startSingleApp(){
  const gotSingleLock = app.requestSingleInstanceLock()
  if (!gotSingleLock) {
    // 如果获取锁失败，则说明应用程序已经在运行，退出当前实例
    app.quit()
  } else {
    start(app);
    // 处理关闭窗口的程序，mac里即使关闭了窗口，程序仍然在运行，需要手动退出； 其他系统只要所有窗口都关闭了，直接退出程序
    // 这个只是惯例，需要根据用户的使用场景来定
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
  }
}

startSingleApp();


function handleIPC() {
  ipcMain.handle('work1-notification', () => {
    let notice = new Notification({
      title: '任务结束',
      body: '是否开始休息',
      actions: [{text: '开始休息', type: 'button'}],
      closeButtonText: '继续工作'
    })
    notice.show()
    notice.on('action', () => {

    })
    notice.on('close', () => {
    })
  })
  const openAboutWindow = require('about-window').default;
  // openAboutWindow({
  // icon_path: path.join(__dirname, 'wx.png'),
  // package_json_dir: path.resolve(__dirname),
  // copyright: 'Copyright (c) 2023  xxxx',
  // homepage: 'https://github.com/',
  // bug_report_url: 'https://github.com/',
  // })
}

