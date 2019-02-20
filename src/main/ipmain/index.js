import { ipcMain } from 'electron';
import { refreshProject, reloadProject, addProject, deleteProject, editInterface } from "../utils"
import storage from "electron-json-storage";
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