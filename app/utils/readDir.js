const path = require('path')
const fs = require('fs')

/**
 * @typedef {Object} FileInfo
 * @property {String} root 根目录
 * @property {String} dir 目录
 * @property {String} base 文件名包含扩展名
 * @property {String} ext 扩展名
 * @property {String} name 文件名
 */

/**
 * @typedef {Object} FileStats
 * @property {Number} dev 包含文件的设备的数字标识符
 * @property {Number} mode 文件类型和模式的位字段
 * @property {Number} nlink 文件存在的硬链接数
 * @property {Number} uid 拥有文件的用户的数字用户标识符
 * @property {Number} gid 拥有文件的群组的数字群组标识符
 * @property {Number} rdev 如果文件代表设备，则为数字设备标识符
 * @property {Number} blksize i/o 操作的文件系统块大小
 * @property {Number} ino 文件的文件系统特定的索引节点编号
 * @property {Number} size 文件的大小（以字节为单位）
 * @property {Number} blocks 为此文件分配的块数
 * @property {Number} atimeMs 指示最后一次访问此文件的时间戳，以 POSIX Epoch 以来的毫秒数表示
 * @property {Number} mtimeMs 指示最后一次修改此文件的时间戳，以 POSIX Epoch 以来的毫秒数表示
 * @property {Number} ctimeMs 指示最后一次更改文件状态的时间戳，以 POSIX Epoch 以来的毫秒数表示
 * @property {Number} birthtimeMs 指示此文件创建时间的时间戳，以 POSIX Epoch 以来的毫秒数表示
 * @property {Date} atime 指示最后一次访问此文件的时间戳
 * @property {Date} mtime 指示最后一次修改此文件的时间戳
 * @property {Date} ctime 指示最后一次更改文件状态的时间戳
 * @property {Date} birthtime 指示此文件创建时间的时间戳
 */

/**
 * @typedef {Object} FileItem
 * @property {String} title 名称
 * @property {FileInfo} info 路径详细
 * @property {String} relativePath 相对路径
 * @property {String} realPath 绝对路径
 * @property {Boolean} isDirectory 是否是目录
 * @property {Number} deep 层级
 * @property {FileStats} stats 文件状态
 * @property {FileItem[]} [children] 子级
 */

/**
 * @typedef {Object} FileOptions
 * @property {Boolean} [traverse=false] 是否递归
 * @property {Boolean} [includeFile=true] 是否包含文件
 */

/**
 * @type {FileOptions}
 */
const _options = {
  traverse: false,
  includeFile: true
}

/**
 * 读取文件后排序，保证文件夹和文件的连续，文件在后，文件夹在前
 * @param {FileItem} a 文件
 * @param {FileItem} b 文件
 * @returns {Number}
 */
const compareFiles = (a, b) => {
  return b.isDirectory - a.isDirectory || b.title > a.title ? -1 : 1
}

/**
 * 获取指定目录下所有的文件、文件夹树
 * @param {String} rootDir 指定目录
 * @param {FileOptions} options 指定目录
 * @param {Number} [deep=0] 开始层级
 * @param {String} [parent=''] 父级路径
 * @returns {FileItem[]}
 */
const readDirTree = (rootDir, options, deep = 0, parent = '') => {
  const opts = Object.assign(_options, options || {})
  const tree = []
  const dir = path.isAbsolute(rootDir) ? rootDir : path.resolve(__dirname, '../../' + rootDir)
  const files = fs.readdirSync(dir)

  files.map(file => {
    const realPath = path.join(dir, file)
    const stats = fs.statSync(realPath)

    const paths = []
    if (parent) {
      paths.push(parent)
    }
    paths.push(file)
    const item = {
      title: file,
      info: path.parse(realPath),
      relativePath: paths.join('/'),
      realPath: realPath,
      isDirectory: stats.isDirectory(),
      deep,
      stats: {
        ...stats
      }
    }

    if (opts?.traverse && item.isDirectory) {
      item.children = readDirTree(`${rootDir}/${file}`, options, deep + 1, paths.join('/'))
      item.children.sort(compareFiles)
    }

    if (opts.includeFile || (!opts.includeFile && item.isDirectory)) {
      tree.push(item)
    }
  })
  tree.sort(compareFiles)
  return tree
}

module.exports = {
  readDirTree
}
