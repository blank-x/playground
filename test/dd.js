const path = require('path')
const fs = require('fs')
const {pinyin} = require('pinyin-pro')

console.log(pinyin("Ni hao", {toneType: 'none'}))
