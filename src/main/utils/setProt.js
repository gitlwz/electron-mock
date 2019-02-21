import storage from "electron-json-storage";
import { refreshProt } from "./refreshProt";
export function setProt(data) {
    storage.set("prot", data, function (error) {
        if (error) throw error;
        refreshProt();
    });
}