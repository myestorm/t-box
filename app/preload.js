const { ipcRenderer } = require('electron')
const path = require('path')

/**
 * 解析路径为数组
 * @param {String} str 要解析的路径
 * @returns {String[]}
 */
const parseDir = (str) => {
  const arr = str.split(path.sep)
  return arr
}

window.addEventListener('DOMContentLoaded', () => {
  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }

  // for (const dependency of ['chrome', 'node', 'electron']) {
  //   replaceText(`${dependency}-version`, process.versions[dependency] + '-----')
  // }
})
window.ipcRenderer = ipcRenderer
window.$utils = {
  parseDir
}