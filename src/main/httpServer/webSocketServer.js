const WebSocket = require('ws');
var Mock = require('mockjs');
import { dialog } from "electron";
import storage from "electron-json-storage";
import { setSocketProt } from "../utils"

export default class Socket {
    constructor() {
        this.wss = null;
    }
    startServer(port = 8999) {
        this.wss = new WebSocket.Server({
            port: port
        });
        setSocketProt(port)
        this.wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                this.autoSocket(ws, message)
            });
            this.ws = ws;
        });
        this.wss.on("error", (error) => {
            if (error.code === "EADDRINUSE") {
                dialog.showErrorBox('WebSocket启动发生错误！', `${error.port}端口已经错在！请修改端口后再启动服务`)
                this.wss;
                setSocketProt(0)
            }
        })
    }
    autoSocket(ws, message) {
        let that = this;
        if (!!ws && !!message) {
            let _message = message + "";
            let _messages = _message.split("/")
            storage.get(_messages[0], function (error, data) {
                if (error) throw error;
                if (!!_messages[1] && !!data.url && _messages[1] === data.url) {
                    if (!!_messages[2]) {
                        let interfaceList = data.interfaceList || [];
                        let _interface = interfaceList.find((ele) => ele.url === _messages[2])

                        if (!!_interface && !!_interface.time && _interface.method === "websocket") {
                            try {
                                console.log("666", ws)

                                that.timer(ws, _interface)
                            } catch (error) {
                                if (error) throw error;
                            }
                            return;
                        }
                    }
                }
                ws.send(JSON.stringify({ "code": 404, "message": "订阅路径不存在" }))
            })
        }
    }
    timer(ws, _interface) {
        if (!!ws && !!_interface.time && ws.readyState === 1) {
            var _data = Mock.mock(JSON.parse(_interface.jsonData))
            ws.send(JSON.stringify(_data));
            setTimeout(() => {
                this.timer(ws, _interface)
            }, _interface.time * 1)
        }
    }
    closeServer() {
        if (!!this.wss) {
            this.wss.close(() => {
                this.wss = null;
                setSocketProt(0)
                const options = {
                    type: 'info',
                    title: '服务已关闭',
                    message: `当前websocket服务已关闭！`,
                }
                dialog.showMessageBox(options, function (index) { })
            })
        }
    }

}


