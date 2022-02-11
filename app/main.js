// main.js
const ipcChannel = require('./ipcChannel/index')

// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow, session, protocol, Notification, ipcMain } = require('electron')
const path = require('path')

const filter = {
  urls: ['http://localhost:3000/upload']
}

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

function createWindow () {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'ELE-FILE',
    icon: 'public/favicon.ico',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 加载 index.html
  // mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  mainWindow.loadURL('http://localhost:3000/')

  // ipcMain.on('PageToMain', (event, args) => {
  //   console.log('收到渲染进程的消息',  args)
  //   mainWindow.webContents.send('MainToPage', '我是主进程已收到消息：' + args)
  // })
  ipcChannel()

  // 打开开发工具
  mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(async () => {
  createWindow()

  app.on('activate', function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
  //   details.requestHeaders['User-Agent'] = 'MyAgent'
  //   callback({ requestHeaders: details.requestHeaders })
  // })

  // protocol.registerStringProtocol('atom', (request, callback) => {
  //   const url = request.url.substring(7)
  //   callback('1234')
  // })
})
// .then(showNotification)

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.setAppUserModelId('Ele-File')

// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用 require 导入。