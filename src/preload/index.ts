import {contextBridge, ipcRenderer} from 'electron';




if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      onUpdate: (cb) => ipcRenderer.on('message', cb),

    })

  } catch (error) {
    console.error(error)
  }
} else {
}
