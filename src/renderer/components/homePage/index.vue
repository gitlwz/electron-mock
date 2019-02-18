<template>
    <div class="">
        <div>
            <project
                v-for="item in array"
                :key="item"
            />
        </div>
        <div class="add-btn">
            <el-button
                type="primary"
                icon="el-icon-plus"
                circle
            ></el-button>
        </div>
    </div>
</template>

<script>
import project from "../project/index";
export default {
    name: "home-page",
    components: { project },
    data() {
        return {
            array: [1, 2]
        };
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
