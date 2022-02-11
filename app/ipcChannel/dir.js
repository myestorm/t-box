const { readDirTree } = require('../utils/readDir')

module.exports = (options) => {
  const _name = 'dir'
  const name = `${options.prefix}${_name}`
  const func = (event, arg, options = {}) => {
    const opts = Object.assign({ traverse: true, includeFile: false }, options)
    const dirs = readDirTree(arg, opts)
    return dirs
  }
  return {
    name,
    func
  }
}
