<template>
    <div>
        <v-header
            icon="el-icon-menu"
            :name="formLabelAlign.name"
            describe="接口列表"
        />
        <v-bar @addClick="addClick" />
        <el-card class="box-card">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    label="Method"
                    width="120"
                >
                    <template slot-scope="scope">{{ scope.row.method }}</template>
                </el-table-column>
                <el-table-column
                    prop="url"
                    label="URL"
                    width="120"
                >
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
                                @click="openInterface(scope.row.id,scope.row.projectUrl)"
                                title="编辑接口"
                                icon="el-icon-edit"
                            ></el-button>
                            <el-button
                                @click="copyLnterface(scope.row.url,scope.row.projectUrl)"
                                size="mini"
                                :disabled="!httprot"
                                title="复制接口连接"
                                icon="el-icon-share"
                            ></el-button>
                            <el-button
                                @click="delInterface(scope.row.id,scope.row.projectUrl)"
                                size="mini"
                                title="删除接口"
                                icon="el-icon-delete"
                            ></el-button>
                        </el-button-group>
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
            formLabelAlign,
            tableData,
            httprot: this.$store.state.prot.httpprot
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
        copyLnterface(url, projectUrl) {
            this.$electron.ipcRenderer.send("get-interface-port");
            this.$electron.ipcRenderer.on(
                "get-interface-port-reply",
                (event, arg) => {
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