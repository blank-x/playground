import {app, BrowserWindow, Notification, ipcMain, Tray, Menu, screen, globalShortcut} from 'electron';
import path from 'path';
import {is} from "@utils";
import appIcon from '../../resources/wx.png?asset'

export default async function (app) {
  let win;
  let willQuitApp = false;
  // 新起一个程序,执行requestSingleInstanceLock的时候会触发其他程序的`second-instance`事件，这是后将第一个app的窗口打开
  app.on('second-instance', () => {
    if (win.isMinimized()) win.restore()
    win.show()
  })

  // import('../accessory/menu.js');
  // 获取屏幕的宽高
  const client = screen.getPrimaryDisplay().workArea;
  win = new BrowserWindow({
    // 设置宽度, 浮点数竟然在mac16寸上会有问题
    width: Math.floor(client.width/1.5),
    // 设置高度
    height: Math.floor(client.height/1.5),
    // 默认展示出窗口
    show: false,
    webPreferences: {
      preload: path.resolve(__dirname, '../preload/index.js'),
    }
  })

  // 使用该事件 避免闪烁
  win.on('ready-to-show', () => {
    win.show()
  })

  // 开发环境下的渲染进程地址
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL']+'/major/index.html')
  } else {
    // 生产环境下的渲染进程地址
    win.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
  // 隐藏菜单栏
  // win.setMenuBarVisibility(false);

  win.on('close', (e) => {
    // 此处的willQuitApp是一个控制变量，用来标记是否要退出程序，在程序接收到要退出的信号时，在before-quit事件里被设置为true, 这时候不会做阻止退出的操作，直接退出了窗口
    if (willQuitApp) {
      // 不要在这里执行console.log，因为这个事件发生在程序退出的时候，这时候console.log不会打印到控制台，可以使用remote模块的console.log来实现打印
      win = null;
    } else {
      e.preventDefault();
      win.hide();
      // debugLifeCircle('close12211', willQuitApp);
    }
  })
  app.on('activate', () => {
    try {
      if(win){
        if(win.isVisible()){
          win.hide()
        } else {
          if (win.isMinimized()){
            win.restore()
          } else{
            win.show()
          }
        }
      }
    }catch (e) {
      console.log(e)
    }
  })
  // handleIPC()


  //
  // const tray = new Tray(appIcon)
  //
  // const contextMenu = Menu.buildFromTemplate([
  //   {label: 'Item1', type: 'radio'},
  //   {label: 'Item2', type: 'radio'},
  //   {label: 'Item3', type: 'radio', checked: true},
  //   {label: 'Item4', type: 'radio'}
  // ])
  // tray.setToolTip('This is my application.')
  // tray.setContextMenu(contextMenu)
  //


  // 关闭窗口会触发before-quit
  app.on('before-quit', function (ev) {
    willQuitApp = true
    win.close()
  })

  return win;
}
