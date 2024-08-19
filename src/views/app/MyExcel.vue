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
import print from 'print-js'
import { exportSheetExcel } from "@/utils/exportEx.js";

import excelData1 from "@/assets/data/excelData1";
import excelData4 from "@/assets/data/excelData4";

const router = useRouter();
const route = useRoute()

const random = Math.floor(Math.random() * 9999)

let autoSave = null;

const apiUrl = '127.0.0.1:11551'

function initialize(id = 0) {
    // console.log(luckysheet);

    var options = {
        container: 'luckysheet', // 设定DOM容器的id
        title: '一通三防', // 设定表格名称
        lang: 'zh', // 设定表格语言
        showinfobar: false,
        // allowUpdate: true,
        // loadUrl: "http://" + apiUrl + "/get/" + id,
        // hook: {
        //     updated: function (e) {
        //         //监听更新,并在3s后自动保存
        //         if (autoSave) clearTimeout(autoSave)
        //         autoSave = setTimeout(function () {
        //             var excel = luckysheet.toJson();
        //             axios.post("http://" + apiUrl + "/set/" + id, {
        //                 jsonExcel: JSON.stringify(excel.data)
        //             })
        //         }, 3 * 1000)
        //         return true;
        //     }
        // },
        // updateUrl: "ws://" + apiUrl + "/ws/" + "用户" + random
        data: getExcelSheetData()
    }
    luckysheet.create(options)
    console.log('data', getExcelSheetData());

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
    const data = luckysheet.getAllSheets()
    console.log(data);
}



function handleSelectMenu(index) {
    console.log(index);
    if (index == 1) {
        router.back()
    } else if (index == 2) {
        save()
    } else if (index == 3) {
        exportSheetExcel(luckysheet.getluckysheetfile())
    } else if (index == 4) {
        // 不要超过范围
        luckysheet.setRangeShow({ row: [0, 3], column: [0, 10] })
        const temp = luckysheet.getScreenshot()
        printJS(temp, 'image')
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

function getExcelSheetData() {
    const sheetData = {}
    // 名称
    // sheetData.name = 'Sheet1'
    // 表格数据
    sheetData.data = []
    // 表头一行
    sheetData.data.push([
        {
            "v": "矿区名称",
            "ct": {
                "fa": "General",
                "t": "g"
            },
            "m": "矿区名称",
            "bg": "rgb(255, 242, 204)",
            "bl": 1,
            "it": 0,
            "ff": 5,
            "fs": 11,
            "fc": "rgb(0, 0, 0)",
            "ht": 0,
            "vt": 0,
            "mc": {
                "r": 0,
                "c": 0,
                "rs": 2,
                "cs": 1
            }
        },
        {
            "v": "盘区",
            "ct": {
                "fa": "General",
                "t": "g"
            },
            "m": "盘区",
            "bg": "rgb(255, 242, 204)",
            "bl": 1,
            "it": 0,
            "ff": 5,
            "fs": 11,
            "fc": "rgb(0, 0, 0)",
            "ht": 0,
            "vt": 0,
            "mc": {
                "r": 0,
                "c": 1,
                "rs": 2,
                "cs": 1
            }
        },
        {
            "v": "工作面名称",
            "ct": {
                "fa": "General",
                "t": "g"
            },
            "m": "工作面名称",
            "bg": "rgb(255, 242, 204)",
            "bl": 1,
            "it": 0,
            "ff": 5,
            "fs": 11,
            "fc": "rgb(0, 0, 0)",
            "ht": 0,
            "vt": 0,
            "mc": {
                "r": 0,
                "c": 2,
                "rs": 2,
                "cs": 1
            }
        },
        {
            "v": "工作面与煤体法距（米）",
            "ct": {
                "fa": "General",
                "t": "g"
            },
            "m": "工作面与煤体法距（米）",
            "bg": "rgb(255, 242, 204)",
            "bl": 1,
            "it": 0,
            "ff": 5,
            "fs": 11,
            "fc": "rgb(0, 0, 0)",
            "ht": 0,
            "vt": 0,
            "mc": {
                "r": 0,
                "c": 3,
                "rs": 2,
                "cs": 1
            }
        },
        {
            "v": "区域效检最大瓦斯含量m3/t",
            "ct": {
                "fa": "General",
                "t": "g"
            },
            "m": "区域效检最大瓦斯含量m3/t",
            "bg": "rgb(255, 242, 204)",
            "bl": 1,
            "it": 0,
            "ff": 5,
            "fs": 11,
            "fc": "rgb(0, 0, 0)",
            "ht": 0,
            "vt": 0,
            "mc": {
                "r": 0,
                "c": 4,
                "rs": 2,
                "cs": 1
            }
        },
        {
            "v": "区域验证",
            "ct": {
                "fa": "General",
                "t": "g"
            },
            "m": "区域验证",
            "bg": "rgb(255, 242, 204)",
            "bl": 1,
            "it": 0,
            "ff": 5,
            "fs": 11,
            "fc": "rgb(0, 0, 0)",
            "ht": 0,
            "vt": 0,
            "mc": {
                "r": 0,
                "c": 5,
                "rs": 1,
                "cs": 4
            }
        },
        {
            "mc": {
                "r": 0,
                "c": 5
            }
        },
        {
            "mc": {
                "r": 0,
                "c": 5
            }
        },
        {
            "mc": {
                "r": 0,
                "c": 5
            }
        },
        {
            "v": "工作面目前作业情况",
            "ct": {
                "fa": "General",
                "t": "g"
            },
            "m": "工作面目前作业情况",
            "bg": "rgb(255, 242, 204)",
            "bl": 1,
            "it": 0,
            "ff": 5,
            "fs": 11,
            "fc": "rgb(0, 0, 0)",
            "ht": 0,
            "vt": 0,
            "mc": {
                "r": 0,
                "c": 9,
                "rs": 2,
                "cs": 1
            }
        },
        {
            "v": "预计揭煤时间",
            "ct": {
                "fa": "General",
                "t": "g"
            },
            "m": "预计揭煤时间",
            "bg": "rgb(255, 242, 204)",
            "bl": 1,
            "it": 0,
            "ff": 5,
            "fs": 11,
            "fc": "rgb(0, 0, 0)",
            "ht": 0,
            "vt": 0,
            "mc": {
                "r": 0,
                "c": 10,
                "rs": 2,
                "cs": 1
            }
        }
    ])
    // 表头二行
    sheetData.data.push([
        {
            "mc": {
                "r": 0,
                "c": 0
            }
        },
        {
            "mc": {
                "r": 0,
                "c": 1
            }
        },
        {
            "mc": {
                "r": 0,
                "c": 2
            }
        },
        {
            "mc": {
                "r": 0,
                "c": 3
            }
        },
        {
            "mc": {
                "r": 0,
                "c": 4
            }
        },
        {
            "v": "最近一次区域验证日期",
            "ct": {
                "fa": "General",
                "t": "g"
            },
            "m": "最近一次区域验证日期",
            "bg": "rgb(255, 242, 204)",
            "bl": 1,
            "it": 0,
            "ff": 5,
            "fs": 11,
            "fc": "rgb(0, 0, 0)",
            "ht": 0,
            "vt": 0
        },
        {
            "v": "最大K1值ml/(g*min1/2)",
            "ct": {
                "fa": "General",
                "t": "g"
            },
            "m": "最大K1值ml/(g*min1/2)",
            "bg": "rgb(255, 242, 204)",
            "bl": 1,
            "it": 0,
            "ff": 5,
            "fs": 11,
            "fc": "rgb(0, 0, 0)",
            "ht": 0,
            "vt": 0
        },
        {
            "v": "最大钻屑量(Kg/m)",
            "ct": {
                "fa": "General",
                "t": "g"
            },
            "m": "最大钻屑量(Kg/m)",
            "bg": "rgb(255, 242, 204)",
            "bl": 1,
            "it": 0,
            "ff": 5,
            "fs": 11,
            "fc": "rgb(0, 0, 0)",
            "ht": 0,
            "vt": 0
        },
        {
            "v": "其他指标",
            "ct": {
                "fa": "General",
                "t": "g"
            },
            "m": "其他指标",
            "bg": "rgb(255, 242, 204)",
            "bl": 1,
            "it": 0,
            "ff": 5,
            "fs": 11,
            "fc": "rgb(0, 0, 0)",
            "ht": 0,
            "vt": 0
        },
        {
            "mc": {
                "r": 0,
                "c": 9
            }
        },
        {
            "mc": {
                "r": 0,
                "c": 10
            }
        }
    ])
    const curData = ['井陉矿区', '2号', '二区段工作面', 23, 55, '2024-04-15', 21, 34, 34, '良好', '2024-04-29']

    sheetData.data.push(getTemplateData(curData))
    sheetData.data.push(getTemplateData(curData))
    sheetData.data.push(getTemplateData(curData))
    // 行高相等情况
    const rowlen = {}
    for (let i = 0; i < sheetData.data.length; i++) {
        rowlen[i] = 40
    }
    // 列宽不相等情况 数量与表头数量一致 === sheetData.data[0].length
    const columnlen = {
        "0": 153,
        "2": 144,
        "3": 118,
        "4": 113,
        "5": 134,
        "6": 127,
        "7": 154,
        "8": 141,
        "9": 190,
        "10": 172
    }

    // 边框属性
    const borderInfo = []
    // 全局边框
    for (let i = 0; i < sheetData.data.length; i++) {
        for (let j = 0; j < sheetData.data[0].length; j++) {
            borderInfo.push({
                "rangeType": "cell",
                "value": {
                    "row_index": i,
                    "col_index": j,
                    "l": {
                        "style": 1,
                        "color": "rgb(0, 0, 0)"
                    },
                    "r": {
                        "style": 1,
                        "color": "rgb(0, 0, 0)"
                    },
                    "t": {
                        "style": 1,
                        "color": "rgb(0, 0, 0)"
                    }
                }
            })
        }
    }
    // 合并属性
    const merge = {
        "0_0": {
            "r": 0,
            "c": 0,
            "rs": 2,
            "cs": 1
        },
        "0_1": {
            "r": 0,
            "c": 1,
            "rs": 2,
            "cs": 1
        },
        "0_2": {
            "r": 0,
            "c": 2,
            "rs": 2,
            "cs": 1
        },
        "0_3": {
            "r": 0,
            "c": 3,
            "rs": 2,
            "cs": 1
        },
        "0_4": {
            "r": 0,
            "c": 4,
            "rs": 2,
            "cs": 1
        },
        "0_5": {
            "r": 0,
            "c": 5,
            "rs": 1,
            "cs": 4
        },
        "0_9": {
            "r": 0,
            "c": 9,
            "rs": 2,
            "cs": 1
        },
        "0_10": {
            "r": 0,
            "c": 10,
            "rs": 2,
            "cs": 1
        }
    }
    sheetData.config = {
        rowlen,
        columnlen,
        borderInfo,
        merge
    }
    return [sheetData]
}

function getTemplateData(data) {
    return data.map(item => {
        return {
            "v": item,
            "ct": {
                "fa": "General",
                "t": "g"
            },
            "m": item,
            "bg": "rgb(255, 242, 204)", // 背景颜色
            "ff": 5,
            "fs": 11,
            "fc": "rgb(0, 0, 0)", // 字体颜色
        }
    })
}
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