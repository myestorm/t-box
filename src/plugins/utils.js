export default {
  install: (app) => {
    Object.defineProperties(app.config.globalProperties, {
      $formatSize: {
        get () {
          return (size, pointLength) => {
            let unit
            const units = [ 'B', 'K', 'M', 'G', 'TB' ]
            while ((unit = units.shift()) && size > 1024) {
              size = size / 1024
            }
            return (unit === 'B' ? size : size.toFixed( pointLength === undefined ? 0 : pointLength)) + unit
          }
        }
      },
      $formatType: {
        get () {
          return (type) => {
            return type ? type.replace(/^\./, '') : '文件夹'
          }
        }
      }
    })
  }
}
