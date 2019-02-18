<template>
    <div style="padding:20px">
        <div>
            <project
                v-for="item in projects"
                :key="item.projectUrl"
                :project="item"
            />
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
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
export default {
    name: "home-page",
    components: { project },
    data() {
        return {};
    },
    computed: {
        ...mapState("projects", {
            projects: state => state.projects
        })
    },
    created() {
        this.$electron.ipcRenderer.send("refresh-project");
    },
    methods: {
        addProject() {
            this.$electron.ipcRenderer.send("open-addproject-pages");
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
</style>
