<template>
    <div class="em-proj-detail__switcher">
        <ul>
            <li @click="addClick">
                <i class="el-icon-plus"></i>
                创建接口
            </li>
            <li>
                <i class="ivu-icon ivu-icon-android-star-outline"></i>
                工作台
            </li>
            <li>
                <i class="ivu-icon ivu-icon-loop"></i>
                同步 Swagger
            </li>
            <li>
                <i class="ivu-icon ivu-icon-code-download"></i>
                打包下载
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "v-bar",
    methods: {
        addClick() {
            this.$emit("addClick");
        }
    }
};
</script>

<style scoped>
.em-proj-detail__switcher {
    width: 800px;
    margin: 20px auto;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 20px;
    color: #fff;
    -webkit-box-shadow: 0 2px 3px #bbb;
    box-shadow: 0 2px 3px #bbb;
    font-size: 13px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
.em-proj-detail__switcher ul {
    display: table;
    table-layout: fixed;
    width: 100%;
}
.em-proj-detail__switcher li {
    background: #252d47;
    padding: 15px 0;
    text-align: center;
    display: table-cell;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
</style>