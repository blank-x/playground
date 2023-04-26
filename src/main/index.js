const { log } = require('console');
const  { app, BrowserWindow, Notification, ipcMain, Tray, Menu, screen, nativeImage} = require('electron')
const path = require('path')
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import appIcon from '../../resources/wx.png?asset'

const openAboutWindow  = require('about-window').default;

const gotTheLock = app.requestSingleInstanceLock()

let win
let willQuitApp = false
if(!gotTheLock){
  app.quit()
} else {
  // 唤起窗口，而不是重新创建一个
  app.on('second-instance', (event, commandLine, workingDirectory)=>{
    if (win.isMinimized()) win.restore()
    win.show()
  })
  app.on('ready', ()=>{
    import('./menu.js')
    
   const client = screen.getPrimaryDisplay().workArea
    win = new BrowserWindow({
      width:client.width,
      height: client.height,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false 
      }
    })
    if (process.platform === 'darwin') {
      win.removeMenu();
    }
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      win.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      win.loadFile(path.join(__dirname, '../renderer/index.html'))
    }

    win.setMenuBarVisibility(false);

    // win.loadFile(path.resolve(__dirname,'./index.html'))
    win.on('close', (e) => {
      if (willQuitApp) {
          win = null;
      } else {
          e.preventDefault();
          win.hide();
      }
    })
    app.on('activate', () => {
      // process.crash()
      if (win.isMinimized()) win.restore()
      win.show()
    })
    handleIPC()

    const tray = new Tray(appIcon)

    const contextMenu = Menu.buildFromTemplate([
      { label: 'Item1', type: 'radio' },
      { label: 'Item2', type: 'radio' },
      { label: 'Item3', type: 'radio', checked: true },
      { label: 'Item4', type: 'radio' }
    ])
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)

    win.webContents.openDevTools()
  })
  app.on('before-quit',function(){
    willQuitApp = true
    win.close()
  })
}





function handleIPC(){
  ipcMain.handle('work1-notification', ()=>{
    let notic = new Notification({
      title: '任务结束',
      body: '是否开始休息',
      actions: [{text: '开始休息', type: 'button'}],
      closeButtonText: '继续工作'
    })
    console.log(1111)
    notic.show()
    notic.on('action', ()=>{

    })
    notic.on('close', ()=>{})
  })

  // openAboutWindow({
    // icon_path: path.join(__dirname, 'wx.png'),
    // package_json_dir: path.resolve(__dirname),
    // copyright: 'Copyright (c) 2023  xxxx',
    // homepage: 'https://github.com/',
    // bug_report_url: 'https://github.com/',
  // })
}

