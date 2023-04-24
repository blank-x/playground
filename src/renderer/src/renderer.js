import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
// import './samples/node-api'

// const { ipcRenderer } = require('electron');

// const Timer = require('timer.js');

// var t = new Timer({
//   tick: 1,
//   ontick: function(ms){
//     let timerContainer = document.getElementById('timer-container')
//     timerContainer.innerText = Math.ceil(ms/1000)
//   },
//   onend: function(ms){
//     let res = ipcRenderer.invoke('work1-notification')
//     console.log('timer end')
//   },
// })

// t.start(100)






createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
