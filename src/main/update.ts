import { ipcMain, app } from 'electron';
import { autoUpdater } from 'electron-updater'
import path from 'path'
// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
function updateHandle ( mainWindow) {
  let message = {
    error: 'update error',
    checking: 'updating...',
    updateAva: 'fetch new version and downloading..1.',
    updateNotAva: 'do not to update'
  }
  console.log(process.env.NODE_ENV)
  const isDevelopment = process.env.NODE_ENV === 'development'

  autoUpdater.forceDevUpdateConfig = true
  // 设置服务器更新地址
  if(isDevelopment){
    autoUpdater.setFeedURL(isDevelopment ? 'http://localhost:3000' : "http://localhost:3000")
  }
  autoUpdater.setFeedURL(isDevelopment ? 'http://localhost:3000' : "http://localhost:3000")

  autoUpdater.on('error', function () {
    console.log('error')
    sendUpdateMessage(message.error)
  })
  autoUpdater.on('checking-for-update', function () {
    console.log('checking-for-update')
    sendUpdateMessage(message.checking)
  })
  // 版本检测结束，准备更新
  autoUpdater.on('update-available', function (info) {
    console.log('update-available')
    sendUpdateMessage(message.updateAva)
  })
  autoUpdater.on('update-not-available', function (info) {

    console.log('update-not-available')
    sendUpdateMessage(message.updateNotAva)
  })
  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    console.log('下载进度百分比>>>', progressObj.percent)
  })
  // 下载完成
  autoUpdater.on('update-downloaded', function () {
    // 退出且重新安装
    autoUpdater.quitAndInstall()
  })
  ipcMain.on('checkForUpdate', () => {
    // 执行自动更新检查
    autoUpdater.checkForUpdates()
  })
  // 通过main进程发送事件给renderer进程，提示更新信息
  function sendUpdateMessage (text) {
    console.log(1111,text)
    mainWindow.webContents.send('message', text)
  }
  // Object.defineProperty(app, 'isPackaged', {
  //   get() {
  //     return true;
  //   }
  // });
  app.whenReady().then(() => {
    console.log(111222111)
    // autoUpdater.checkForUpdatesAndNotify()
    autoUpdater.checkForUpdates()
  });

}
export default updateHandle
