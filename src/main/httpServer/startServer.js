
var express = require('express');
var app = express();
var Mock = require('mockjs');
var http = require('http');
import { dialog } from "electron";
import storage from "electron-json-storage";
import { refreshProt, getIPAdress, setProt } from "../utils"
const restc = require('restc');
app.use(restc.express())
export default class MyServer {
    constructor() {
        this.server = null;
    }
    statrtServer(port) {
        let that = this;
        let server = http.createServer(app)
        this.server = server.listen(port, () => {
            refreshProt();
            // const options = {
            //     type: 'info',
            //     title: '服务已启动',
            //     message: `启动地址http://${getIPAdress()}:${port}`,
            // }
            // dialog.showMessageBox(options, function (index) { })
        })
        server.on("error", function (error) {
            setProt(0)
            if (error.code === "EADDRINUSE") {
                dialog.showErrorBox('启动服务发生错误！', `${error.port}端口已经错在！请修改端口后再启动服务`)
                that.server = null;
            }
        })
        app.all('*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
            res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
            if (req.method == 'OPTIONS') {
                res.send(200); /让options请求快速返回/
            } else {
                let paths = req.path.split("/")
                if (!!paths[1]) {
                    storage.get(paths[1], function (error, data) {
                        if (error) throw error;
                        try {
                            if (!!paths[2] && !!data.url && paths[2] === data.url) {
                                if (!!paths[3]) {
                                    let interfaceList = data.interfaceList || [];
                                    let _interface = interfaceList.find((ele) => ele.url === paths[3])
                                    if (!!_interface && _interface.method === req.method) {
                                        var _data = Mock.mock(JSON.parse(_interface.jsonData))
                                        res.send(_data);
                                        res.end();
                                        return;
                                    }
                                }
                            }
                        } catch (error) {
                            that.sendError(res, error)
                        }
                        that.sendError(res)
                    });
                } else {
                    that.sendError(res)
                }
            }
        });
    }
    closeServer(callBack) {
        if (!!this.server) {
            this.server.close(() => {
                this.server = null;
                setProt(0)
                const options = {
                    type: 'info',
                    title: '服务已关闭',
                    message: `当前http服务已关闭！`,
                }
                dialog.showMessageBox(options, function (index) { })
                callBack && callBack();
            });
        }
    }
    sendError(res, error = { code: 404, errormessage: "请求错误！" }) {
        res.status(404)
        res.send(error);
        res.end();
    }
}