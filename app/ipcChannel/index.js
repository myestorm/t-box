const glob = require('glob')
const path = require('path')
const { ipcMain } = require('electron')

const _opts = {
  prefix: 'ipcMain/',
  files: './**/!(index).js'
}

module.exports = (options) => {
  const opts = Object.assign(_opts, options)
  const files = glob.sync(path.resolve(__dirname, opts.files))
  for (const file of files) {
    const filePath = path.resolve(__dirname, file)
    const content = require(filePath)(opts)
    ipcMain.handle(content.name, content.func)
  }
}
