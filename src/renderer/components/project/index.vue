<template>
    <el-card class="box-card">
        <div slot="header">
            <span>{{project.name}}</span>
            <span
                @click="projectEdit(project.projectUrl)"
                class="home-edit"
            >
                <i class="el-icon-edit"></i>
            </span>
        </div>
        <div class="describe">
            {{project.describe}}
        </div>
        <div class="project-url">
            /{{project.url}}
        </div>
        <div class="buttons-group">
            <el-button-group>
                <el-button
                    @click="openInterfaceList(project.projectUrl)"
                    title="查看项目所有接口"
                    size="mini"
                    icon="el-icon-search"
                ></el-button>
                <el-button
                    title="复制项目地址"
                    size="mini"
                    icon="el-icon-share"
                ></el-button>
                <el-button
                    @click="delProject(project.projectUrl)"
                    title="删除项目"
                    size="mini"
                    icon="el-icon-delete"
                ></el-button>
            </el-button-group>
        </div>
    </el-card>
</template>
<script>
export default {
    name: "project",
    props: {
        project: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {};
    },
    methods: {
        delProject(projectUrl) {
            this.$electron.ipcRenderer.send("delete-project", projectUrl);
        },
        projectEdit(projectUrl) {
            this.$electron.ipcRenderer.send(
                "open-addproject-pages",
                `?projectUrl=${projectUrl}`
            );
        },
        openInterfaceList(projectUrl) {
            this.$electron.ipcRenderer.send(
                "open-interfacelist-pages",
                `?projectUrl=${projectUrl}`
            );
        }
    }
};
</script>

<style scoped>
.box-card {
    width: 270px;
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 10px;
}
.home-edit {
    float: right;
    cursor: pointer;
}
.describe {
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-top: 10px;
    background: #f5f5f5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.describe::before {
    content: "";
    display: block;
    width: 20px;
    height: 2px;
    background: #2d8cf0;
    border-radius: 4px;
    margin-bottom: 3px;
}
.project-url {
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-top: 10px;
    background: #f5f5f5;
}
.project-url::before {
    content: "";
    display: block;
    width: 20px;
    height: 2px;
    background: #f84c5b;
    border-radius: 4px;
    margin-bottom: 3px;
}
.buttons-group {
    margin-top: 10px;
    margin-left: 1px;
    width: 100%;
}
.buttons-group .el-button-group {
    width: 100%;
    display: flex;
}
.buttons-group button {
    flex: auto;
}
</style>
