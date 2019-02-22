<template>
    <div>
        <v-header
            icon="el-icon-news"
            name="服务配置"
            describe="端口冲突了？来修改一下端口号吧"
        />
        <div class="cards">
            <el-card class="card-box">
                <div slot="header">
                    <span>http服务配置</span>
                </div>
                <div>
                    <el-form
                        label-position="right"
                        label-width="80px"
                        ref="ruleForm"
                        :model="formLabelAlign"
                    >
                        <el-form-item
                            label="端口号"
                            prop="httprot"
                            :rules="[
                                { required: true, message: '端口号不能为空' },
                                {
                                    type: 'number',
                                    message: '端口号必须为数字值'
                                }
                            ]"
                        >
                            <el-input-number
                                v-model="formLabelAlign.httprot"
                                controls-position="right"
                                :min="8000"
                                :max="10000"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item>
                            <el-button-group>
                                <el-button
                                    :disabled="$store.state.prot.httpprot"
                                    size="mini"
                                    @click="openHttp('ruleForm')"
                                    >启动服务</el-button
                                >
                                <el-button
                                    :disabled="!$store.state.prot.httpprot"
                                    @click="closeHttp"
                                    size="mini"
                                    >关闭服务</el-button
                                >
                            </el-button-group>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
            <el-card class="card-box">
                <div slot="header">
                    <span>websocket服务配置</span>
                </div>
                <div>
                    <el-form
                        label-position="right"
                        label-width="80px"
                        ref="ruleForm2"
                        :model="formLabelSocket"
                    >
                        <el-form-item
                            label="端口号"
                            prop="websocketprot"
                            :rules="[
                                { required: true, message: '端口号不能为空' },
                                {
                                    type: 'number',
                                    message: '端口号必须为数字值'
                                }
                            ]"
                        >
                            <el-input-number
                                v-model="formLabelSocket.websocketprot"
                                controls-position="right"
                                :min="8000"
                                :max="10000"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item>
                            <el-button-group>
                                <el-button
                                    :disabled="!!$store.state.prot.websocketprot"
                                    size="mini"
                                    @click="openSocket('ruleForm2')"
                                    >启动服务</el-button
                                >
                                <el-button
                                    :disabled="!$store.state.prot.websocketprot"
                                    @click="closeSocket"
                                    size="mini"
                                    >关闭服务</el-button
                                >
                            </el-button-group>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import vHeader from "../v-header";
export default {
    name: "server-seting",
    data() {
        return {
            formLabelAlign: {
                httprot: this.$store.state.prot.httpprot
            },
            formLabelSocket: {
                websocketprot: this.$store.state.prot.websocketprot
            }
        };
    },
    watch: {
        "$store.state.prot.httpprot"(newdata, olddata) {
            this.formLabelAlign.httprot = newdata;
        },
        "$store.state.prot.websocketprot"(newdata, olddata) {
            this.formLabelSocket.websocketprot = newdata;
        }
    },
    components: { "v-header": vHeader },
    methods: {
        openHttp(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$electron.ipcRenderer.send(
                        "open-http-server",
                        this.formLabelAlign.httprot
                    );
                } else {
                    return false;
                }
            });
        },
        closeHttp() {
            this.$electron.ipcRenderer.send("close-http-server");
        },
        openSocket(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$electron.ipcRenderer.send(
                        "open-websocket-server",
                        this.formLabelSocket.websocketprot
                    );
                } else {
                    return false;
                }
            });
        },
        closeSocket() {
            this.$electron.ipcRenderer.send("close-websocket-server");
        }
    }
};
</script>

<style scoped>
.cards {
    width: 800px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
}
.card-box {
    width: 47%;
}
</style>