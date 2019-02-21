import store from "../../renderer/store/index.js"
import storage from "electron-json-storage";
export function refreshProject() {
    storage.getAll(function (error, data) {
        if (error) throw error;
        delete data.prot;
        store.dispatch("projects/refreshProject", data)
    });
}