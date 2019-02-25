<template>
    <div style="padding:20px">
        <div style="margin-bottom:120px">
            <project
                v-for="item in projects"
                :key="item.projectUrl"
                :project="item"
            />
        </div>
        <div class="author">
            <div class="top">
                <img :src="favicon" alt="" />
                <span>刘文柱</span>
            </div>
            <div class="text">年轻无为，卖马为生</div>
            <div class="url">
                <span class="span-item" @click="serverSetingClick"
                    >当前服务配置</span
                >
                <span
                    class="span-item"
                    @click="openShell('https://gitlwz.github.io/')"
                    >个人博客</span
                >
                <span>v{{ version }}</span>
            </div>
        </div>
        <div class="add-btn">
            <el-button
                title="添加项目"
                @click="addProject"
                type="primary"
                icon="el-icon-plus"
                circle
            ></el-button>
        </div>
    </div>
</template>

<script>
import project from "../project/index";
import { mapState } from "vuex";
import favicon from "@/assets/favicon.jpg";
export default {
    name: "home-page",
    components: { project },
    data() {
        return {
            favicon,
            version: 0
        };
    },
    computed: {
        ...mapState("projects", {
            projects: state => state.projects
        })
    },
    created() {
        this.$electron.ipcRenderer.send("refresh-project");
        this.$electron.ipcRenderer.send("get-app-version");
        this.$electron.ipcRenderer.on(
            "get-app-version-reply",
            (error, version) => {
                this.version = version;
            }
        );
    },
    methods: {
        addProject() {
            this.$electron.ipcRenderer.send("open-addproject-pages");
        },
        openShell(url) {
            this.$electron.shell.openExternal(url);
        },
        serverSetingClick() {
            this.$electron.ipcRenderer.send("open-server-seting-pages");
        }
    }
};
</script>

<style scoped>
.home-left {
    width: 50%;
}
.add-btn {
    position: fixed;
    right: 50px;
    bottom: 50px;
}
.add-btn button {
    box-shadow: 0 10px 30px rgba(45, 140, 240, 0.4);
}
.home-edit {
    float: right;
    cursor: pointer;
}
.author {
    position: fixed;
    left: 50px;
    bottom: 50px;
}
.author .top {
    display: flex;
    font-size: 14px;
    height: 30px;
    align-items: center;
}
.author .top span {
    margin-left: 14px;
}
.author .top img {
    width: 30px;
    border-radius: 50%;
}
.author .text {
    margin-top: 12px;
    font-size: 12px;
    color: #333;
}
.author .url {
    margin-top: 12px;
}
.author .url span {
    font-size: 12px;
    cursor: pointer;
    color: #409eff;
    margin-right: 14px;
}
</style>
