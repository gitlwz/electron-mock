import storage from "electron-json-storage";
import { refreshProject } from "./refreshProject";
import { reloadProject, addProject } from "./saveProject";
import { deleteProject } from "./deleteProject";
import { editInterface } from "./editInterface";
import { deleteInterface } from "./deleteInterface";
import { refreshProt } from "./refreshProt";
import { setProt } from "./setProt";
function startServer(myServer, prot) {
    if (prot !== undefined) {
        storage.set('prot', { httpprot: prot }, function (error) {
            if (error) throw error;
            myServer.statrtServer(prot);
        });
    } else {
        storage.get('prot', function (error, data) {
            if (error) throw error;
            const { httpprot } = data;
            if (!httpprot) {
                storage.set('prot', { httpprot: 9090 }, function (error) {
                    if (error) throw error;
                    myServer.statrtServer(httpprot);
                });
            } else {
                myServer.statrtServer(httpprot);
            }
        });
    }
}

function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
export {
    refreshProject,
    reloadProject,
    addProject,
    deleteProject,
    editInterface,
    deleteInterface,
    refreshProt,
    startServer,
    getIPAdress,
    setProt
}