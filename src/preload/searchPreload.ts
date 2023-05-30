import { contextBridge, ipcRenderer } from 'electron';


contextBridge.exposeInMainWorld('myAPI', {
  desktop: true,
})

const api = {}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {

    })
    contextBridge.exposeInMainWorld('search', {
      searchResize: () => ipcRenderer.invoke('search:resize'),
      searchEverying: (value) => ipcRenderer.invoke('search:everying', value),
      openApp: (appPath) => ipcRenderer.invoke('search:openApp', appPath),
    })
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
