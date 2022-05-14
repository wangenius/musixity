// 引入electron并创建一个BrowserWindow
const {app, BrowserWindow,Menu,ipcMain,Tray} = require('electron')
const path = require('path')
const url = require("url");

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow

// 获取在 package.json 中的命令脚本传入的参数，来判断是开发还是生产环境
const mode = process.argv[2];


const trayMenuTemplate = [
 {
  // 系统托盘图标目录
  label: '退出',
  click: () => {
   app.quit();
  }
 }
];
// 设置系统托盘图标
const iconPath = path.join(__dirname, mode === 'dev'?'favicon.ico':'../build/favicon.ico');

// 图标的上下文菜单
const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);


function createWindow () {


 mainWindow = new BrowserWindow({
   width: 1400,
   height: 900,
   minWidth: 1400,
   minHeight: 900,
   // resizable:false,
   frame:false,
   transparent: true,
   icon: path.join(__dirname, mode === 'dev'?'favicon.ico':'../build/favicon.ico'),
   webPreferences: {
    preload: path.join(__dirname, '/preload.js'),
   enableRemoteModule: true
   },
 })

 Menu.setApplicationMenu(null) //取消菜单栏

 // mainWindow.loadURL("http://localhost:3000/"); //前端开发环境地址

 //判断是否是开发模式
 if(mode === 'dev') {
  mainWindow.loadURL("http://localhost:3000/")
 } else {
  mainWindow.loadURL(url.format({
   pathname:path.join(__dirname, '../build/index.html'),
   protocol:'file:',
   slashes:true,
   hash: '/',
  }))
  console.log(__dirname)
 }

 // 打开开发者工具，默认不打开
 // mainWindow.webContents.openDevTools()



 // 关闭window时触发下列事件.
 mainWindow.on('closed', function () {
 mainWindow = null
 })

}
// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', ()=>{
 createWindow();
 const appTray = new Tray(iconPath);

 // 设置托盘悬浮提示
 appTray.setToolTip('never forget');

// 设置托盘菜单
 appTray.setContextMenu(contextMenu);


 appTray.on('click', () => {
  // 显示主程序
  mainWindow.show();
  // 关闭托盘显示
  // appTray.destroy();
 });

 return appTray;

})
// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
 // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
 if (process.platform !== 'darwin') {
 app.quit()
 }
})
app.on('activate', function () {
 // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
 if (mainWindow === null) {
 createWindow()
 }
})

// 退出程序
ipcMain.on('window-close', function () {
 app.quit()

})

// 最小化
ipcMain.on('window-minimize', function () {
 mainWindow.minimize()

})

// 全屏
ipcMain.on('window-fullScreen', function () {
 if (mainWindow.isFullScreen()){
  mainWindow.restore()
 }else {
  mainWindow.setFullScreen(true)
 }
})

// 最小化至托盘
ipcMain.on('window-minToTray', function () {
 mainWindow.hide()
})

// 最大化
ipcMain.on('window-maxToFull', function () {
 if (mainWindow.isMaximized()){
  mainWindow.unmaximize()
 }else {
  mainWindow.maximize()
 }
})
