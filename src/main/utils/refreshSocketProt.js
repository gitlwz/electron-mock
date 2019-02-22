import store from "../../renderer/store/index.js"
import storage from "electron-json-storage";
export function refreshSocketProt(calllBack) {
    storage.get("sockprot", function (error, data) {
        if (error) throw error;
        if (!data.websocketprot) data.websocketprot = 0;
        store.dispatch("prot/websocketprot", data)
        calllBack && calllBack()
    });
}