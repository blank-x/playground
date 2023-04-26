"use strict";
const utils = require("@electron-toolkit/utils");
const path$1 = require("path");
const appIcon = path$1.join(__dirname, "../../resources/wx.png");
require("console");
const { app, BrowserWindow, Notification, ipcMain, Tray, Menu, screen, nativeImage } = require("electron");
const path = require("path");
require("about-window").default;
const gotTheLock = app.requestSingleInstanceLock();
let win;
let willQuitApp = false;
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    if (win.isMinimized())
      win.restore();
    win.show();
  });
  app.on("ready", () => {
    Promise.resolve().then(() => require("./menu-7ac7bac6.js"));
    const client = screen.getPrimaryDisplay().workArea;
    win = new BrowserWindow({
      width: client.width,
      height: client.height,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });
    if (process.platform === "darwin") {
      win.removeMenu();
    }
    if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
      win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    } else {
      win.loadFile(path.join(__dirname, "../renderer/index.html"));
    }
    win.setMenuBarVisibility(false);
    win.on("close", (e) => {
      if (willQuitApp) {
        win = null;
      } else {
        e.preventDefault();
        win.hide();
      }
    });
    app.on("activate", () => {
      if (win.isMinimized())
        win.restore();
      win.show();
    });
    handleIPC();
    const tray = new Tray(appIcon);
    const contextMenu = Menu.buildFromTemplate([
      { label: "Item1", type: "radio" },
      { label: "Item2", type: "radio" },
      { label: "Item3", type: "radio", checked: true },
      { label: "Item4", type: "radio" }
    ]);
    tray.setToolTip("This is my application.");
    tray.setContextMenu(contextMenu);
    win.webContents.openDevTools();
  });
  app.on("before-quit", function() {
    willQuitApp = true;
    win.close();
  });
}
function handleIPC() {
  ipcMain.handle("work1-notification", () => {
    let notic = new Notification({
      title: "任务结束",
      body: "是否开始休息",
      actions: [{ text: "开始休息", type: "button" }],
      closeButtonText: "继续工作"
    });
    console.log(1111);
    notic.show();
    notic.on("action", () => {
    });
    notic.on("close", () => {
    });
  });
}
