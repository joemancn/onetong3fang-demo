<template>
    <div style="height: 100%;" ref="chartRef"></div>
</template>

<script setup name="MyChartC">
import { onMounted, onBeforeUnmount, watch, ref, nextTick } from "vue";
import * as echarts from "echarts";
import _ from 'lodash'

const props = defineProps({
    optionData: {
        type: Object,
        default() {
            return {
                data: [],
                labels: [],
            }
        }
    }

})
let myChart, option
const chartRef = ref()
// 图表初始化
function initChart() {
    myChart = echarts.init(chartRef.value);

    option = {
        grid: {
            top: '30%',
            right: '10%',
            left: '10%',
            bottom: '15%',
        },
        legend: {
            top: '5%',
            right: 10,
            textStyle: {
                color: 'rgba(255, 255, 255, 0.60)'
            },
            icon: 'path://M11.4228868,8.57082861 L9.61630516,7.71277111 C8.95813575,9.09872152 7.56094636,10 6,10 C5.24686094,10 4.52905925,9.79344369 3.90434348,9.40807122 L2.85505392,11.1107138 C3.76952212,11.6746433 4.84676549,12 6,12 C8.39371838,12 10.4600404,10.5982497 11.4228868,8.57082861 Z M2.72787399,0.969933867 C1.08560537,2.04043779 0,3.89344053 0,6 C0,7.44127492 0.50818073,8.76385787 1.35513671,9.79834337 L2.90273473,8.53148095 C2.32147062,7.82156856 2,6.93812762 2,6 C2,4.62999912 2.6919988,3.38085186 3.81971263,2.64560943 L2.72787399,0.969933867 Z M6,0 C5.53199247,0 5.07650001,0.053583394 4.63932286,0.154949948 L5.09162572,2.10313439 C5.31259031,2.0519337 5.53875187,2.01952095 5.76875987,2.00651462 L6,2 C8.209139,2 10,3.790861 10,6 C10,6.14304187 9.99257169,6.28480372 9.97785173,6.42500157 L11.9668374,6.63461189 C11.98876,6.42607132 12,6.21434828 12,6 C12,2.6862915 9.3137085,0 6,0 Z'
        },
        textStyle: {
            color: '#ffffff'
        },
        // title: {
        //     text: '（mol/L）',
        //     left: '0',
        //     top: '5%',
        //     textStyle: {
        //         color: 'rgba(255, 255, 255, 0.60)',
        //         fontSize: 14
        //     }
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'none'
            },
            backgroundColor: 'rgba(22, 42, 75, 1)',
            borderWidth: 0,
            textStyle: {
                color: '#FFF'
            },
            position: function (point, params, dom, rect, size) {
                // 固定在顶部
                return [point[0], -18];
            },
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.60)'
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.60)',
                }
            },
            data: ['5-10', '5-11', '5-12', '5-13', '5-14', '5-15', '5-16'],
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: 'rgba(54, 80, 122, 1)'
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.60)',
                }
            },
            minInterval: 1,
        },
        series: [{
            type: 'line',
            smooth: true,
            showSymbol: false,
            name: '矿1',
            data: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
        }, {
            type: 'line',
            smooth: true,
            showSymbol: false,
            name: '矿2',
            data: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
        }, {
            type: 'line',
            smooth: true,
            showSymbol: false,
            name: '矿3',
            data: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
        }, {
            type: 'line',
            smooth: true,
            showSymbol: false,
            name: '矿4',
            data: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
        }]
    };
    myChart.setOption(option);
}
function resize() {
    if (myChart) {
        myChart.resize()
    }
}
onMounted(() => {
    initChart()
    window.addEventListener('resize', resize)
    setTimeout(() => {
        resize()
    }, 0)
})
onBeforeUnmount(() => {
    if (myChart) {
        window.removeEventListener('resize', resize)
        myChart.dispose()
        myChart = undefined
    }
})
defineExpose({
    initChart,
    resize
});

watch(() => props.optionData, async (newVal, oldVal) => {
    await nextTick()
    initChart()
}, { immediate: true, deep: true });
</script>
<style lang='scss' scoped></style>