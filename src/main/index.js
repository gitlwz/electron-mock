import { app, BrowserWindow, Menu } from 'electron'
import './winPage/index.js';
import "./ipmain/index.js";
import { autoUpdater } from "electron-updater";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`
global._winURL = winURL;

function createWindow() {
    /**
     * Initial window options
     */
    Menu.setApplicationMenu(null)
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        title: "mock",
        width: 1000
    })

    mainWindow.loadURL(winURL)
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    mainWindow.on('page-title-updated', (event) => {
        event.preventDefault()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */
app.on('ready', () => {
    if (process.env.NODE_ENV === 'production') {
        autoUpdater.setFeedURL('http://192.168.100.193/electron/');
        autoUpdater.checkForUpdates()
        autoUpdater.on('update-downloaded', function () { //下载完成后执行 quitAndInstall
            autoUpdater.quitAndInstall(); //关闭软件并安装新版本
        });
        autoUpdater.on('error', function (error) { //下载完成后执行 quitAndInstall
            console.log("************111", error)
        });

        autoUpdater.on('update-not-available', function (error) { //下载完成后执行 quitAndInstall
            console.log("************222当没有可用更新的时候触发")
        });
        autoUpdater.on('update-available', function (error) { //下载完成后执行 quitAndInstall
            console.log("************333当发现一个可用更新的时候触发，更新包下载会自动开始")
        });

        autoUpdater.on('checking-for-update', function (error) { //下载完成后执行 quitAndInstall
            console.log("************444当开始检查更新的时候触发")
        });
        autoUpdater.on('update-downloaded', () => {
            autoUpdater.quitAndInstall()
        })
    }
})

