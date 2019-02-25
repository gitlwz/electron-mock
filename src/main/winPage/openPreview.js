import { ipcMain, BrowserWindow } from 'electron'
ipcMain.on('open-preview-page', function (event, arg) {
    createWindow(arg)
})
let mainWindow = null;
function createWindow(arg = "") {
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000
    })

    mainWindow.loadURL(arg)
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}