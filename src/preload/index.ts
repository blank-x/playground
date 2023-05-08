import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true,
})



const api = {}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {})

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