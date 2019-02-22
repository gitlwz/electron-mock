import storage from "electron-json-storage";
import { refreshSocketProt } from "./refreshSocketProt";
export function setSocketProt(data, callBack) {
    if (data !== null && data !== undefined) {
        storage.set("sockprot", { websocketprot: data }, function (error) {
            if (error) throw error;
            refreshSocketProt(callBack);
        });
    }
}