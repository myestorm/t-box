const { readDirTree, findFile } = require('../utils/readDir')

module.exports = (options) => {
  const prefix = options.prefix
  const groupName = 'dir'
  const name = `${prefix}${groupName}`
  return [{
    name,
    func: (event, arg, _options = {}) => {
      const opts = Object.assign({ traverse: true, includeFile: false }, _options)
      const res = {}
      try {
        const dirs = readDirTree(arg, opts)
        res.code = 0
        res.data = dirs
      } catch (err) {
        res.code = 1
        res.msg = '目录不存在'
      }
      return res
    }
  }, {
    name: `${name}/search`,
    func: (event, arg) => {
      const { rootDir, keyword } = arg
      const res = {}
      try {
        const data = findFile(rootDir, keyword)
        res.code = 0
        res.data = data
      } catch (err) {
        res.code = 1
        res.msg = '目录不存在'
      }
      return res
    }
  }]
}
