import dayjs from 'dayjs'

export default {
  install: (app) => {
    Object.defineProperties(app.config.globalProperties, {
      $formatDay: {
        get () {
          return (monment) => {
            return dayjs(monment).format('YYYY-MM-DD')
          }
        }
      },
      $formatTime: {
        get () {
          return (monment) => {
            return dayjs(monment).format('YYYY-MM-DD HH:mm:ss')
          }
        }
      },
      $dayjs: {
        get () {
          return dayjs
        }
      }
    })
  }
}
