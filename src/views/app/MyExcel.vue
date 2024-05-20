<template>
    <el-container style="height: 1080px;width: 1920px;">
        <el-header>
            <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                @select="handleSelectMenu">
                <el-menu-item index="1">返回</el-menu-item>
                <el-menu-item index="2">保存</el-menu-item>
                <el-menu-item index="3">导出</el-menu-item>
                <el-menu-item index="4">打印</el-menu-item>
                <el-menu-item index="5">审批</el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-tree style="max-width: calc(100vh - 100px)" :data="fileData" default-expand-all
                    @node-click="handleFileClick" />
            </el-aside>
            <el-main>
                <div id="luckysheet" style="height: 100%;"></div>
            </el-main>
        </el-container>
    </el-container>
</template>
<!-- eslint-disable no-undef -->
<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
import axios from "axios";
import _ from "lodash";

import excelData3 from "@/assets/data/excelData3";
import excelData4 from "@/assets/data/excelData4";

const router = useRouter();
const route = useRoute()

const random = Math.floor(Math.random() * 9999)

let autoSave = null;

const apiUrl = '127.0.0.1:11551'

function initialize(id = 0) {
    var options = {
        container: 'luckysheet', // 设定DOM容器的id
        title: '一通三防', // 设定表格名称
        lang: 'zh', // 设定表格语言
        showinfobar: false,
        allowUpdate: true,
        loadUrl: "http://" + apiUrl + "/get/" + id,
        hook: {
            updated: function (e) {
                //监听更新,并在3s后自动保存
                if (autoSave) clearTimeout(autoSave)

                autoSave = setTimeout(function () {
                    var excel = luckysheet.toJson();
                    //去除临时数据,减小体积
                    // for (var i in excel) excel[i].data = undefined
                    // $.post(
                    //     "http://" + location.host + "/set",
                    //     { jsonExcel: JSON.stringify(excel) },
                    //     function () {
                    //         $(luckysheet_info_detail_save).text("已保存")
                    //     })
                    axios.post("http://" + apiUrl + "/set/" + id, {
                        jsonExcel: JSON.stringify(excel.data)
                    })
                }, 3 * 1000)
                return true;
            }
        },
        updateUrl: "ws://" + apiUrl + "/ws/" + "用户" + random
    }
    luckysheet.create(options)
}

function handleFileClick(val) {
    if (val.label === '调度日报') {
        initialize(1)
    } else if (val.label === '调度周报') {
        initialize(2)
    } else {
        initialize(0)
    }
}

// 获取格式
function save() {
    const data = luckysheet.toJson()
    console.log(data);
}



function handleSelectMenu(index) {
    console.log(index);
    if (index == 1) {
        router.back()
    } else if (index == 2) {
        save()
    } else if (index == 3) {
        save()
    }
}



const fileData = ref([
    {
        label: '瓦斯巡检',
        children: [
            {
                label: '调度日报',
            },
            {
                label: '调度周报',
            },
            {
                label: '值班表',
            },
        ],
    },
    {
        label: '通风系统',
        children: [
            {
                label: '2-1',
            }
        ],
    }
])

onMounted(() => {
    initialize();

})

// watchEffect(() => {
//     console.log(props.data);
//     if (univer) {
//         univer.dispose();
//         initialize()
//     }

// })

</script>

<style lang="scss" scoped>
#my-excel {
    height: 100%;
}

.el-header,
.el-main {
    padding: 0;
}
</style>