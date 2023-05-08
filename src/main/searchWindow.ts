import {app, BrowserWindow, Notification, ipcMain, Tray, Menu, screen, globalShortcut} from 'electron';
import path from "path";
import {is} from "@utils";

const searchWindowBound = {
  width: 500,
  height: 80,
};


export default function (app) {
  let searchWindow;
  let resolveFn = null
  app.whenReady().then(() => {
    const createWindow = () => {
      if (searchWindow) {
        if(searchWindow?.isVisible()){
          searchWindow?.hide()
        } else {
          searchWindow?.show()
        }
      } else {
        searchWindow = new BrowserWindow({
          ...searchWindowBound,
          frame: false,
          show: false,
          transparent: true,
          resizable: false,
          useContentSize: true,
          webPreferences:{
            preload: path.resolve(__dirname,'../preload/searchPreload.js')
          }
        })
        searchWindow.setAlwaysOnTop(true, 'pop-up-menu')

        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
          // 开发环境下的渲染进程地址
          searchWindow.loadURL(process.env['ELECTRON_RENDERER_URL']+'/search/index.html')
        } else {
          // 生产环境下的渲染进程地址
          searchWindow.loadFile(path.join(__dirname, '../renderer/search/index.html'))
        }

        searchWindow.on('close', (e) => {
          searchWindow = null // 释放内存
        })

        searchWindow.on('blur', (e) => {
          searchWindow?.hide() // 失去焦点时隐藏
        })


        searchWindow.on('ready-to-show', () => {
          searchWindow.show() // 初始化后再显示
        })
        ipcMain.handle('search:resize', async function () {
          const contentHeight = await searchWindow.webContents.executeJavaScript(`document.body.scrollHeight`)
          console.log('search:resize',contentHeight)
          // 调整窗口高度以适应内容
          searchWindow.setSize(800, contentHeight)
        })

        resolveFn(searchWindow)
      }


      if (process.platform === 'darwin') {
        app.dock.hide(); // 隐藏 Dock 栏图标
        Menu.setApplicationMenu(null); // 替换菜单栏为一个空的菜单, 这样就不会有菜单栏了
      }
    }
    globalShortcut.register('Command+L', createWindow )
  })

  app.on('before-quit', function (ev) {
    searchWindow?.close()
    globalShortcut.unregister('Command+L')
  })

  return new Promise<BrowserWindow>((resolve, reject) => {
    resolveFn = resolve;
  })
}
