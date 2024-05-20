<template>
    <div class="my-pie-chart">
        <div style="width: 100%; height: 190px;" ref="chartRef"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";
import "echarts-gl";
import { getPie3D, getParametricEquation } from "@/utils/pie-echart.js"; //工具类js，页面路径自己修改
import _ from 'lodash';


const props = defineProps({
    optionData: Array,
})

let myChart = null
let option = {}
const chartRef = ref()

// 图表初始化
function initChart() {
    const clone = [
        {
            name: "安全区",
            value: 23,
            itemStyle: {
                color: '#44D493',
            }
        },
        {
            name: "警示区",
            value: 18,
            itemStyle: {
                color: '#EDE880',
            }
        },
        {
            name: "风险区",
            value: 2,
            itemStyle: {
                color: '#ED554E',
            }
        },
        {
            "name": "超限区",
            "value": 1,
            itemStyle: {
                color: '#ed554e',
            }
        }
    ]
    // 
    myChart = echarts.init(chartRef.value);
    // 传入数据生成 option, 构建3d饼状图, 参数工具文件已经备注的很详细
    option = getPie3D(clone, 0.7, 200, 30, 20, 1);
    // option.legend = legend
    myChart.setOption(option);
    // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption);
    // myChart.setOption(option);
}


let hoveredIndex = ''

onMounted(() => {
    initChart()
    // myChart.on("mouseover", (params) => {
    //     // 准备重新渲染扇形所需的参数
    //     let isSelected;
    //     let isHovered;
    //     let startRatio;
    //     let endRatio;
    //     let k;
    //     // 如果触发 mouseover 的扇形当前已高亮，则不做操作
    //     if (hoveredIndex === params.seriesIndex) {
    //         // 否则进行高亮及必要的取消高亮操作
    //     } else {
    //         // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
    //         if (hoveredIndex !== "") {
    //             // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
    //             isSelected =
    //                 option.series[hoveredIndex].pieStatus.selected;
    //             isHovered = false;
    //             startRatio =
    //                 option.series[hoveredIndex].pieData.startRatio;
    //             endRatio = option.series[hoveredIndex].pieData.endRatio;
    //             k = option.series[hoveredIndex].pieStatus.k;

    //             // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
    //             option.series[hoveredIndex].parametricEquation =
    //                 getParametricEquation(
    //                     startRatio,
    //                     endRatio,
    //                     isSelected,
    //                     isHovered,
    //                     k,
    //                     option.series[hoveredIndex].pieData.value
    //                 );
    //             option.series[hoveredIndex].pieStatus.hovered = isHovered;
    //             // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
    //             hoveredIndex = "";
    //         }
    //         // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）


    //         // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
    //         isSelected =
    //             option.series[params.seriesIndex].pieStatus.selected;
    //         isHovered = true;
    //         startRatio =
    //             option.series[params.seriesIndex].pieData.startRatio;
    //         endRatio =
    //             option.series[params.seriesIndex].pieData.endRatio;
    //         k = option.series[params.seriesIndex].pieStatus.k;
    //         // 对当前点击的扇形，执行高亮操作（对 option 更新）
    //         option.series[params.seriesIndex].parametricEquation =
    //             getParametricEquation(
    //                 startRatio,
    //                 endRatio,
    //                 isSelected,
    //                 isHovered,
    //                 k,
    //                 option.series[params.seriesIndex].pieData.value + 20
    //             );
    //         option.series[params.seriesIndex].pieStatus.hovered =
    //             isHovered;
    //         // 记录上次高亮的扇形对应的系列号 seriesIndex
    //         hoveredIndex = params.seriesIndex;

    //         // 使用更新后的 option，渲染图表
    //         myChart.setOption(option);
    //     }
    // });
    // 修正取消高亮失败的 bug
    myChart.on("globalout", () => {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        if (hoveredIndex !== "") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected = option.series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            k = option.series[hoveredIndex].pieStatus.k;
            startRatio = option.series[hoveredIndex].pieData.startRatio;
            endRatio = option.series[hoveredIndex].pieData.endRatio;
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            option.series[hoveredIndex].parametricEquation =
                getParametricEquation(
                    startRatio,
                    endRatio,
                    isSelected,
                    isHovered,
                    k,
                    option.series[hoveredIndex].pieData.value
                );
            option.series[hoveredIndex].pieStatus.hovered = isHovered;
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = "";
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(option);
    });
    window.addEventListener('resize', resize)
})
function resize() {
    if (myChart) {
        myChart.resize()
    }
}
onBeforeUnmount(() => {
    if (myChart) {
        window.removeEventListener('resize', resize)
        myChart.dispose()
        myChart = undefined
    }
})
watch(() => props.optionData, async (newVal, oldVal) => {
    await nextTick()
    initChart()
}, { deep: true });


</script>

<style lang='scss' scoped>
.my-pie-chart {
    width: 212px;
    height: 200px;
    background-image: url("@/assets/images/pie-bottom.png");
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: center 80%;
}
</style>