import {app, BrowserWindow, Notification, ipcMain, Tray, Menu, screen, globalShortcut} from 'electron';
import {is, moveSecondScreen} from '@utils';
import log from 'electron-log'
import MainWindow from './mainWindow'
import SearchWindow from './searchWindow'
import updateHandle from './update'

log.info('App starting...')

class App {
  constructor() {}
  async devStart(){
    await app.whenReady()
    const searchWindowFn = function(){
      const searchWindow = SearchWindow.create()
      searchWindow.on('create',(win)=>{
        // moveSecondScreen(win);
        win.webContents.openDevTools({mode: 'undocked'});
        win.removeAllListeners('blur')
      })
    }

    const mainWindowFn = () => {
      const mainWindowInstance = MainWindow.create()
      const win = mainWindowInstance.getWin()
      // moveSecondScreen(win);
      win.webContents.openDevTools({mode: 'detach'});
      // updateHandle(win)
    };
    mainWindowFn()
    // searchWindowFn()
  }
  async start(){
    await app.whenReady()
    // 开发环境，调试使用
    const mainWindowInstance = MainWindow.create()
    const win = mainWindowInstance.getWin()
    console.log(11122221)
    updateHandle(win)
    win.webContents.openDevTools({mode: 'detach'});

    // SearchWindow.create()
  }
  startSingleApp(){
    const gotSingleLock = app.requestSingleInstanceLock()
    if (!gotSingleLock) {
      // 如果获取锁失败，则说明应用程序已经在运行，退出当前实例
      app.quit()
    } else {
      if(is.dev){
        this.start();
      }else{
        this.start();
      }

      // 处理关闭窗口的程序，mac里即使关闭了窗口，程序仍然在运行，需要手动退出； 其他系统只要所有窗口都关闭了，直接退出程序
      // 这个只是惯例，需要根据用户的使用场景来定
      app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
          app.quit()
        }
      })
    }
  }
}

new App().startSingleApp()



