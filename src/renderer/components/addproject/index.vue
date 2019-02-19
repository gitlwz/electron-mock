<template>
    <div>
        <v-header
            icon="el-icon-plus"
            name="创建项目"
            describe="创建一个令人愉快的项目"
        />
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
import vHeader from "../v-header";
export default {
    name: "add-project",
    components: { "v-header": vHeader },
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

