const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'T-BOX',
    icon: 'public/favicon.ico',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 加载 index.html
  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  // mainWindow.loadURL('http://localhost:3000/')

  ipcMain.on('sendMessage', (event, args) => {
    console.log('收到渲染进程的消息',  args)
    mainWindow.webContents.send('receiveMessage', '我是主进程已收到消息：' + args)
  })

  // 打开开发工具
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(async () => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}).then(showNotification)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.setAppUserModelId('t-box')