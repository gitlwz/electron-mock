<template>
    <div class="interface">
        <div class="editor">
            <editor
                @init="editorInit"
                @input="changeData"
                :autoComplete=true
                :value='dataView'
                :highlightActiveLine=true
                lang="json"
                theme="monokai"
            ></editor>
        </div>
        <div class="right">
            <div class="em-spots"><span
                    class="decorate"
                    style="background: rgb(0, 62, 135); width: 44px; height: 44px; margin-top: -22px; margin-left: -22px; top: 11.9443%; left: 5%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(23, 90, 171); width: 34px; height: 34px; margin-top: -17px; margin-left: -17px; top: 17.7894%; left: 15%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(0, 62, 135); width: 36px; height: 36px; margin-top: -18px; margin-left: -18px; top: 69.9149%; left: 25%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(57, 38, 115); width: 41px; height: 41px; margin-top: -20.5px; margin-left: -20.5px; top: 74.5591%; left: 35%;"
                ></span><span
                    class="decorate"
                    style="width: 43px; height: 43px; margin-top: -21.5px; margin-left: -21.5px; top: 65.6633%; left: 45%;"
                ></span><span
                    class="decorate"
                    style="width: 36px; height: 36px; margin-top: -18px; margin-left: -18px; top: 43.6441%; left: 55%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(23, 90, 171); width: 37px; height: 37px; margin-top: -18.5px; margin-left: -18.5px; top: 84.8327%; left: 65%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(233, 34, 36); width: 34px; height: 34px; margin-top: -17px; margin-left: -17px; top: 97.7061%; left: 75%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(233, 34, 36); width: 42px; height: 42px; margin-top: -21px; margin-left: -21px; top: 86.3251%; left: 85%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(233, 34, 36); width: 26px; height: 26px; margin-top: -13px; margin-left: -13px; top: 23.2159%; left: 95%;"
                ></span></div>
            <div class="form-box">
                <div class="title">创建接口</div>
                <el-card class="box-card">
                    <el-form
                        label-position="top"
                        label-width="80px"
                        :model="formLabelAlign"
                        :rules="rules"
                        ref="dynamicValidateForm"
                    >
                        <el-form-item
                            label="Method"
                            prop="method"
                        >
                            <el-select
                                v-model="formLabelAlign.method"
                                placeholder="选择请求方法"
                            >
                                <el-option
                                    label="POST"
                                    value="POST"
                                ></el-option>
                                <el-option
                                    label="GET"
                                    value="GET"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="URL"
                            prop="url"
                        >
                            <el-input
                                v-model="formLabelAlign.url"
                                placeholder="输入请求地址"
                            >
                                <template slot="prepend">/</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item
                            label="描述"
                            prop="describe"
                        >
                            <el-input v-model="formLabelAlign.describe"></el-input>
                        </el-form-item>
                    </el-form>
                    <div>
                        <el-button-group>
                            <el-button
                                @click="submitForm('dynamicValidateForm')"
                                type="primary"
                                size="small"
                            >创建</el-button>
                            <el-button
                                @click="formatJsonData(dataView)"
                                size="small"
                                type="primary"
                            >
                                格式化代码
                            </el-button>
                        </el-button-group>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import editor from "vue2-ace-editor";
import "brace/ext/language_tools";
import "brace/mode/json";
import "brace/theme/monokai";
import { cloneDeep } from "lodash";
export default {
    name: "interface",
    components: {
        editor
    },
    data() {
        return {
            dataView: this.formatJson(JSON.stringify({ data: {} })),
            ed: null,
            formLabelAlign: {},
            rules: {
                method: [
                    {
                        required: true,
                        message: "请选择方法类型",
                        trigger: "blur"
                    }
                ],
                url: [
                    {
                        required: true,
                        message: "请输入接口地址",
                        trigger: "blur"
                    }
                ],
                describe: [
                    {
                        required: true,
                        message: "请输入接口描述",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    mounted() {
        console.log(document.getElementById("editor"));
    },
    methods: {
        editorInit(ed) {
            this.ed = ed;
            ed.setFontSize(16);
            ed.setOption("wrap", "free");
        },
        changeData: function(value) {
            this.dataView = value;
            console.dir(this.dataView);
        },
        submitForm(formName) {
            try {
                let jsonData = JSON.stringify(this.dataView);
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let _formLabelAlign = cloneDeep(this.formLabelAlign);
                        const { projectUrl } = this.$route.query;
                        _formLabelAlign.projectUrl = projectUrl;
                        if (!_formLabelAlign.id) {
                            _formLabelAlign.id = new Date().getTime() + "";
                        }
                        let jsonData = this.dataView;
                        _formLabelAlign.jsonData = jsonData;
                        this.$electron.ipcRenderer.send(
                            "edit-interface",
                            _formLabelAlign
                        );
                        this.$electron.ipcRenderer.on(
                            "edit-interface-reply",
                            (event, arg) => {
                                this.$message({
                                    message: "添加成功！",
                                    type: "success"
                                });
                            }
                        );
                    } else {
                        return false;
                    }
                });
            } catch (error) {
                this.$message.error("请输入正确格式的JSON数据！");
            }
        },
        formatJsonData(json) {
            this.formatJson(json, (falg, json) => {
                if (falg) {
                    this.dataView = json;
                } else {
                    this.$message.error("请输入正确格式的JSON数据！");
                }
            });
        },
        formatJson(v, callback) {
            let json = v;
            try {
                json = JSON.stringify(JSON.parse(v), null, "    ");
                callback && callback(true, json);
            } catch (e) {
                json = v;
                callback && callback(false, e);
            }
            return json;
        }
    }
};
</script>
<style scoped>
.interface {
    display: flex;
    width: 100%;
    height: 100%;
}
.editor {
    flex: auto;
}
.right {
    width: 300px;
    background: #2d8cf0;
    padding: 20px;
    overflow: auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-shadow: 0 0 3px #000;
    box-shadow: 0 0 3px #000;
    position: relative;
    overflow: hidden;
}
.em-spots .decorate {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #4b89fc;
    position: absolute;
    left: 200px;
    opacity: 0.13;
}
.form-box {
    width: 100%;
}
.form-box .title {
    color: #fff;
    font-size: 13px;
    text-align: center;
    padding: 6px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    margin-bottom: 20px;
}
.el-button-group {
    display: flex;
}
.el-button-group button {
    width: 0;
    flex: auto;
}
</style>
<style>
.interface .el-form-item__label {
    line-height: 1;
}
.interface .el-form-item {
    margin-bottom: 20px;
}
</style>


