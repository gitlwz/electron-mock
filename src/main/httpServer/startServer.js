
var express = require('express');
var app = express();
var Mock = require('mockjs');
var http = require('http');
import storage from "electron-json-storage";

export default class MyServer {
    constructor() {
        this.server = null;
    }
    statrtServer(port = 9090) {
        let that = this;
        let server = http.createServer(app)
        this.server = server.listen(port, () => {

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
                                    if (!!_interface) {
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
    closeServer() {
        if (!!this.server) {
            this.server.close(() => {
                this.server = null;
                console.log("server close");
            });
        }
    }
    sendError(res, error = { code: 404, errormessage: "请求错误！" }) {
        res.status(404)
        res.send(error);
        res.end();
    }
}