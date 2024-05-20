<template>
    <el-container style="height: 100vh">
        <el-header>
            <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                @select="handleSelectMenu">
                <el-menu-item index="1">返回</el-menu-item>
                <el-menu-item index="2">保存</el-menu-item>
                <el-menu-item index="3">导出</el-menu-item>
                <el-menu-item index="4">打印</el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-tree style="max-width: calc(100vh - 100px)" :data="fileData" default-expand-all
                    @node-click="handleFileClick" />
            </el-aside>
            <el-main>
                <div id="my-excel">
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import "@univerjs/design/lib/index.css";
import "@univerjs/ui/lib/index.css";
import "@univerjs/docs-ui/lib/index.css";
import "@univerjs/sheets-ui/lib/index.css";
import "@univerjs/sheets-formula/lib/index.css";

import { Univer } from "@univerjs/core";
import { defaultTheme } from "@univerjs/design";

import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";

import { UniverUIPlugin } from "@univerjs/ui";

import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";

import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";

import { FUniver } from "@univerjs/facade";

import { onMounted, ref } from "vue";
import { useRouter, useRoute } from 'vue-router';

import excelData1 from "@/assets/data/excelData1";
import excelData2 from "@/assets/data/excelData2";


const router = useRouter();
const route = useRoute()

let univer, univerAPI
function initialize(data = {}) {
    univer = new Univer({
        theme: defaultTheme,
    });

    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);

    univer.registerPlugin(UniverUIPlugin, {
        container: 'my-excel',
        header: true,
        footer: true,
    });

    univer.registerPlugin(UniverDocsPlugin, {
        hasScroll: false,
    });
    univer.registerPlugin(UniverDocsUIPlugin);

    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);

    univer.createUniverSheet(data);
    univerAPI = FUniver.newAPI(univer);
}

function handleFileClick(val) {
    let data
    if (val.label === '巡检数据表') {
        data = excelData1()
    } if (val.label === '气体检测表') {
        data = excelData2()
    }

    changeData(data)
}

function changeData(data) {
    if (univer) {
        univer.dispose();
        initialize(data)
    }
}

// 获取格式
function save() {
    const activeWorkbook = univerAPI.getActiveWorkbook()
    const saveData = activeWorkbook.getSnapshot();
    console.log(saveData);
}

function handleSelectMenu(index) {
    console.log(index);
    if (index == 1) {
        router.back()
    } else if (index == 2) {
        save()
    } else if (index == 3) {

    }
}



const fileData = ref([
    {
        label: '瓦斯巡检',
        children: [
            {
                label: '巡检数据表',
            },
            {
                label: '气体检测表',
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