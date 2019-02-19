<template>
    <div>
        <v-header
            icon="el-icon-menu"
            name="创建项目"
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
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="URL"
                    width="120"
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="描述"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作"
                    show-overflow-tooltip
                >
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import vHeader from "../v-header";
import vBar from "../v-bar";
export default {
    name: "interface-list",
    components: { "v-header": vHeader, "v-bar": vBar },
    data() {
        return {
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ]
        };
    },
    methods: {
        addClick() {
            console.log("7777777");
        },
        handleSelectionChange(){
            console.log("*********",arguments)
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