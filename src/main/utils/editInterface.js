import storage from "electron-json-storage";
export function editInterface(arg, callBack) {
    let { projectUrl } = arg
    storage.get(projectUrl, function (error, data) {
        if (error) throw error;
        let interfaceList = data.interfaceList || [];
        let index = interfaceList.findIndex((ele) => ele.id === arg.id)
        if (index !== -1) {
            interfaceList[index] = { ...interfaceList[index], ...arg }
            data.interfaceList = interfaceList;
        } else {
            interfaceList.push(arg)
            data.interfaceList = interfaceList;
        }
        storage.set(projectUrl, data, function (error) {
            if (error) throw error;
            callBack && callBack()
        })
    });
}