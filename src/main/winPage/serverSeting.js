import { ipcMain, BrowserWindow } from 'electron'
ipcMain.on('open-server-seting-pages', function (event, arg) {
    createWindow(arg)
})
let mainWindow = null;
function createWindow(arg = "") {
    const _winURL = global._winURL
    const modalPath = _winURL + "#/server-seting" + arg;
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000
    })

    mainWindow.loadURL(modalPath)
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}