import { ipcMain, app } from 'electron';
import { setSocketProt, startSocket, startServer, refreshProject, reloadProject, addProject, deleteProject, editInterface, deleteInterface } from "../utils"
import storage from "electron-json-storage";
import server from "../httpServer/startServer";
import webSocketServer from "../httpServer/webSocketServer";
let myServer = new server();
let mywebSocketServer = new webSocketServer();
startServer(myServer);
startSocket(mywebSocketServer)
//刷新项目
ipcMain.on('refresh-project', function (event, arg) {
    refreshProject();
})

//添加项目数据
ipcMain.on('addproject-data', function (event, arg) {
    storage.has(arg.projectUrl, function (error, hasKey) {
        if (error) throw error;
        if (hasKey) {
            reloadProject(arg, () => {
                event.sender.send('addproject-data-reply', '更新成功！')
                refreshProject();
            })
        } else {
            addProject(arg, () => {
                event.sender.send('addproject-data-reply', '添加成功！')
                refreshProject();
            })
        }
    });
})

//删除某个项目
ipcMain.on('delete-project', function (event, arg) {
    deleteProject(arg, () => {
        refreshProject();
    })
})

//通过projectUrl 获取项目详情
ipcMain.on('get-project-by-projectUrl', function (event, arg) {
    storage.get(arg, function (error, data) {
        if (error) throw error;
        event.sender.send('get-project-by-projectUrl-reply', data)
    });
})


//添加接口
ipcMain.on('edit-interface', function (event, arg) {
    editInterface(arg, () => {
        refreshProject();
        event.sender.send('edit-interface-reply')
    })
})

//删除接口
ipcMain.on('delete-interface', function (event, arg) {
    deleteInterface(arg, () => {
        refreshProject();
    })
})



//获取服务端口号
ipcMain.on('get-interface-port', function (event, arg) {
    if (!!myServer.server) {
        event.sender.send('get-interface-port-reply', myServer.server.address().port)
    }
})


//关闭服务
ipcMain.on('close-http-server', function (event, arg) {
    if (!!myServer.server) {
        myServer.closeServer();
    }
})


//打开服务
ipcMain.on('open-http-server', function (event, arg) {
    startServer(myServer, arg);
})


//关闭服务
ipcMain.on('close-websocket-server', function (event, arg) {
    mywebSocketServer.closeServer();
})

//开启
ipcMain.on('open-websocket-server', function (event, arg) {
    console.log("&&&&&&&&&&7", arg)
    setSocketProt(arg, () => {
        startSocket(mywebSocketServer)
    });
})


//开启
ipcMain.on('get-app-version', function (event, arg) {
    event.sender.send('get-app-version-reply', app.getVersion())
})