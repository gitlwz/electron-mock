import storage from "electron-json-storage";
export function deleteInterface(arg, callBack) {
    const { id, projectUrl } = arg;
    storage.get(projectUrl, function (error, data) {
        if (error) throw error;
        let interfaceList = data.interfaceList || [];
        let index = interfaceList.findIndex((ele) => ele.id === id);
        if (index !== -1) {
            interfaceList.splice(index, 1);
            data.interfaceList = interfaceList;
            storage.set(projectUrl, data, function (error) {
                if (error) throw error;
                callBack && callBack();
            });
        }
    });
}