import storage from "electron-json-storage";
export function reloadProject(arg, callBack) {
    storage.get(arg.projectUrl, (error, data) => {
        if (error) throw error;
        let newData = { ...data, ...arg }
        storage.set(arg.projectUrl, newData, function (error) {
            if (error) throw error;
            callBack && callBack()
        });
    });
}
export function addProject(arg, callBack) {
    storage.set(arg.projectUrl, arg, function (error) {
        if (error) throw error;
        callBack && callBack()
    });
}