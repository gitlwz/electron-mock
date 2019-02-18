import storage from "electron-json-storage";
export function deleteProject(arg, callBack) {
    storage.remove(arg, function (error, data) {
        if (error) throw error;
        callBack && callBack()
    });
}