<template>
    <div>
        <header>
            <div
                class="em-spots"
                style=""
            ><span
                    class="decorate"
                    style="background: rgb(255, 86, 0); width: 34px; height: 34px; margin-top: -17px; margin-left: -17px; top: 80.1769%; left: 5%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(23, 90, 171); width: 52px; height: 52px; margin-top: -26px; margin-left: -26px; top: 40.4299%; left: 15%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(57, 38, 115); width: 48px; height: 48px; margin-top: -24px; margin-left: -24px; top: 48.8031%; left: 25%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(0, 135, 231); width: 37px; height: 37px; margin-top: -18.5px; margin-left: -18.5px; top: 31.4133%; left: 35%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(233, 34, 36); width: 51px; height: 51px; margin-top: -25.5px; margin-left: -25.5px; top: 52.4444%; left: 45%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(57, 38, 115); width: 24px; height: 24px; margin-top: -12px; margin-left: -12px; top: 74.1552%; left: 55%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(57, 38, 115); width: 46px; height: 46px; margin-top: -23px; margin-left: -23px; top: 21.2004%; left: 65%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(57, 38, 115); width: 30px; height: 30px; margin-top: -15px; margin-left: -15px; top: 88.2094%; left: 75%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(23, 90, 171); width: 43px; height: 43px; margin-top: -21.5px; margin-left: -21.5px; top: 43.0932%; left: 85%;"
                ></span><span
                    class="decorate"
                    style="background: rgb(57, 38, 115); width: 51px; height: 51px; margin-top: -25.5px; margin-left: -25.5px; top: 21.7012%; left: 95%;"
                ></span></div>
            <div class="em-container">
                <div>
                    <h2>创建项目</h2>
                    <p>创建一个令人愉快的项目</p>
                </div>
            </div>
        </header>
        <el-card class="box-card">
            <div class="box-form">
                <el-form
                    label-position="top"
                    label-width="80px"
                    :model="formLabelAlign"
                    :rules="rules"
                    ref="dynamicValidateForm"
                >
                    <el-form-item
                        label="项目名"
                        prop="name"
                    >
                        <el-input v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="归属 / 项目基础 URL"
                        prop="url"
                    >
                        <div class="box-name">
                            <div class="box-name-project">{{formLabelAlign.projectUrl}}</div>
                            <span>/</span>
                            <el-input v-model="formLabelAlign.url"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item
                        label="项目描述"
                        prop="describe"
                    >
                        <el-input v-model="formLabelAlign.describe"></el-input>
                    </el-form-item>
                </el-form>
                <el-button
                    type="primary"
                    @click="submitForm('dynamicValidateForm')"
                >提交</el-button>
            </div>
        </el-card>
    </div>

</template>

<script>
export default {
    name: "add-project",
    data() {
        return {
            formLabelAlign: {
                projectUrl: new Date().getTime() + ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入项目名",
                        trigger: "blur"
                    }
                ],
                url: [
                    {
                        required: true,
                        message: "请输入项目基础URL",
                        trigger: "blur"
                    }
                ],
                describe: [
                    {
                        required: true,
                        message: "请输入项目描述",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        const { projectUrl } = this.$route.query;
        if (!!projectUrl) {
            this.$electron.ipcRenderer.send(
                "get-project-by-projectUrl",
                projectUrl
            );
            this.$electron.ipcRenderer.on(
                "get-project-by-projectUrl-reply",
                (event, arg) => {
                    this.formLabelAlign = arg;
                }
            );
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$electron.ipcRenderer.send(
                        "addproject-data",
                        this.formLabelAlign
                    );
                    this.$electron.ipcRenderer.on(
                        "addproject-data-reply",
                        (event, arg) => {
                            this.$message({
                                message: arg,
                                type: "success"
                            });
                        }
                    );
                } else {
                    return false;
                }
            });
        }
    }
};
</script>
<style scoped>
header {
    position: relative;
    overflow: hidden;
    padding: 30px 0;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    overflow-y: hidden;
    width: 100%;
    transition: all 0.3s;
}
.decorate {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #4b89fc;
    position: absolute;
    left: 200px;
    opacity: 0.13;
}
.em-container {
    padding: 0 20px;
    max-width: 1020px;
    margin: auto;
    text-align: center;
}
.em-container div {
    display: inline-block;
    text-align: left;
}
.em-container h2 {
    font-weight: bold;
}
.em-container p {
    margin-top: 10px;
    font-size: 12px;
    color: #9a9ca0;
}

.box-card {
    width: 800px;
    margin: 20px auto;
}
.box-form {
    width: 300px;
    margin: 0 auto;
}
.box-name {
    display: flex;
}
.box-name-project {
    font-size: 14px;
    padding-left: 8px;
    padding-right: 8px;
    background-color: #f3f3f3;
    /* color: #ccc; */
    border-radius: 4px;
}
.box-name > span {
    padding-left: 8px;
    padding-right: 8px;
    font-size: 20px;
}
</style>

