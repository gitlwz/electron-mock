<template>
    <div>
        <v-header icon="el-icon-menu" :name="formLabelAlign.name">
            <template #describe>
                <p v-if="!!httprot">
                    项目地址：<span
                        >http://localhost:{{ httprot }}/{{
                            formLabelAlign.projectUrl
                        }}/{{ formLabelAlign.url }}</span
                    >
                </p>
                <p v-else style="color:red">
                    当前http服务未启动
                </p>
                <p v-if="!!websocketprot">
                    websocket地址:<span
                        >ws://localhost:{{ websocketprot }}/ws</span
                    >
                </p>
                <p v-else style="color:red">
                    当前websocket服务未启动
                </p>
            </template>
        </v-header>
        <v-bar @addClick="addClick" />
        <el-card class="box-card">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column label="Method" width="120">
                    <template slot-scope="scope">{{
                        scope.row.method
                    }}</template>
                </el-table-column>
                <el-table-column prop="url" label="URL/订阅标识" width="120">
                </el-table-column>
                <el-table-column
                    prop="describe"
                    label="描述"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-button
                                size="mini"
                                @click="
                                    openInterface(
                                        scope.row.id,
                                        scope.row.projectUrl
                                    )
                                "
                                title="编辑接口"
                                icon="el-icon-edit"
                            ></el-button>
                            <el-button
                                @click="
                                    copyLnterface(
                                        scope.row.url,
                                        scope.row.projectUrl,
                                        scope.row
                                    )
                                "
                                size="mini"
                                :disabled="
                                    scope.row.method == 'websocket'
                                        ? !websocketprot
                                        : !httprot
                                "
                                title="复制接口连接"
                                icon="el-icon-share"
                            ></el-button>
                            <el-button
                                @click="
                                    delInterface(
                                        scope.row.id,
                                        scope.row.projectUrl
                                    )
                                "
                                size="mini"
                                title="删除接口"
                                icon="el-icon-delete"
                            ></el-button>
                        </el-button-group>
                        <el-button
                            v-if="scope.row.method != 'websocket'"
                            size="mini"
                            @click="
                                extThumbPreview(
                                    scope.row.url,
                                    scope.row.projectUrl,
                                    scope.row
                                )
                            "
                            title="接口预览"
                            icon="el-icon-view"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import vHeader from "../v-header";
import vBar from "../v-bar";
import { mapState } from "vuex";
import { cloneDeep } from "lodash";
export default {
    name: "interface-list",
    components: { "v-header": vHeader, "v-bar": vBar },
    data() {
        const { projectUrl } = this.$route.query;
        let formLabelAlign = {
            projectUrl: new Date().getTime() + ""
        };
        let tableData = [];
        if (!!projectUrl) {
            formLabelAlign = cloneDeep(
                this.$store.state.projects.projects[projectUrl] || {
                    projectUrl: new Date().getTime() + ""
                }
            );
            tableData = formLabelAlign.interfaceList;
        }
        return {
            name: "name",
            formLabelAlign,
            tableData,
            httprot: this.$store.state.prot.httpprot,
            websocketprot: this.$store.state.prot.websocketprot
        };
    },
    watch: {
        "$store.state.projects.projects"(newdata, olddata) {
            const { projectUrl } = this.$route.query;
            if (!!projectUrl) {
                this.formLabelAlign = cloneDeep(
                    newdata[projectUrl] || {
                        projectUrl: new Date().getTime() + ""
                    }
                );
                this.tableData = this.formLabelAlign.interfaceList || [];
            }
        },
        "$store.state.prot.httpprot"(newdata, olddata) {
            this.httprot = newdata;
        },
        "$store.state.prot.websocketprot"(newdata, olddata) {
            this.websocketprot = newdata;
        }
    },
    methods: {
        addClick(projectUrl) {
            this.$electron.ipcRenderer.send(
                "open-interface-pages",
                `?projectUrl=${this.formLabelAlign.projectUrl}`
            );
        },
        handleSelectionChange() {
            // console.log("*********",arguments)
        },
        delInterface(id, projectUrl) {
            this.$electron.ipcRenderer.send("delete-interface", {
                id,
                projectUrl
            });
        },
        openInterface(id, projectUrl) {
            this.$electron.ipcRenderer.send(
                "open-interface-pages",
                `?id=${id}&projectUrl=${projectUrl}`
            );
        },
        extThumbPreview(url, projectUrl, row) {
            this.$electron.ipcRenderer.send("get-interface-port");
            this.$electron.ipcRenderer.once(
                "get-interface-port-reply",
                (event, arg) => {
                    let project = this.$store.state.projects.projects[
                        projectUrl
                    ];
                    let _url = `http://localhost:${arg}/${projectUrl}/${
                        project.url
                    }/${url}`;
                    if (row.method === "POST") {
                        _url += "#!method=POST";
                    } else {
                        _url += "#!method=get";
                    }
                    this.$electron.ipcRenderer.send("open-preview-page", _url);
                }
            );
        },
        copyLnterface(url, projectUrl, row) {
            if (row.method === "websocket") {
                let project = this.$store.state.projects.projects[projectUrl];
                let copy = `${projectUrl}/${project.url}/${url}`;
                this.$electron.clipboard.writeText(copy);
                this.$message({
                    message: "websocket订阅标识复制成功：" + copy,
                    type: "success"
                });
                return;
            }
            this.$electron.ipcRenderer.send("get-interface-port");
            this.$electron.ipcRenderer.once(
                "get-interface-port-reply",
                (event, arg) => {
                    console.log("**********", 1);
                    let project = this.$store.state.projects.projects[
                        projectUrl
                    ];
                    let copy = `http://localhost:${arg}/${projectUrl}/${
                        project.url
                    }/${url}`;
                    this.$electron.clipboard.writeText(copy);
                    this.$message({
                        message: "地址复制成功,地址为" + copy,
                        type: "success"
                    });
                }
            );
        }
    }
};
</script>

<style scoped>
.box-card {
    width: 800px;
    margin: 20px auto;
}
</style>