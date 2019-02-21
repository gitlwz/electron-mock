import store from "../../renderer/store/index.js"
import storage from "electron-json-storage";
export function refreshProt() {
    storage.get("prot", function (error, data) {
        if (error) throw error;
        store.dispatch("prot/refreshprot", data)
    });
}