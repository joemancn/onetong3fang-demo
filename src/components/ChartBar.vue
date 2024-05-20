<template>
    <div style="height: 100%;" ref="chartRef"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch, nextTick, ref } from "vue";
import * as echarts from "echarts";
import _ from 'lodash'

const props = defineProps({
    optionData: {
        type: Object,
        default() {
            return {
                data: [{

                }],
                labels: ['5-10', '5-11', '5-12', '5-13', '5-14', '5-15', '5-16'],
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
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '30px',
        },
        textStyle: {
            color: '#ffffff'
        },
        legend: {
            top: '5%',
            right: 10,
            textStyle: {
                color: 'rgba(255, 255, 255, 0.60)'
            },
            icon: 'path://M9,0.514718626 L11.4847186,2.99971863 L15,3 L14.9997186,6.51471863 L17.4852814,9 L14.9997186,11.4847186 L15,15 L11.4847186,14.9997186 L9,17.4852814 L6.51471863,14.9997186 L3,15 L2.99971863,11.4847186 L0.514718626,9 L2.99971863,6.51471863 L3,3 L6.51471863,2.99971863 L9,0.514718626 Z M10.0687186,14.9997186 L7.92871863,14.9997186 L8.99929289,16.0703607 L10.0687186,14.9997186 Z M3.99971863,12.4847186 L4,14 L5.51471863,13.9997186 L3.99971863,12.4847186 Z M11.0707186,3.99971863 L6.92671863,3.99971863 L3.99971863,6.92671863 L3.99971863,11.0707186 L6.92871863,13.9997186 L11.0687186,13.9997186 L13.9997186,11.0687186 L13.9997186,6.92871863 L11.0707186,3.99971863 Z M13.9997186,12.4847186 L12.4847186,13.9997186 L14,14 L13.9997186,12.4847186 Z M9,4.75735931 L13.2426407,9 L9,13.2426407 L4.75735931,9 L9,4.75735931 Z M2.99971863,7.92671863 L1.92822508,8.99929289 L2.99971863,10.0707186 L2.99971863,7.92671863 Z M14.9997186,7.92871863 L14.9997186,10.0687186 L16.0703607,8.99929289 L14.9997186,7.92871863 Z M5.51471863,3.99971863 L4,4 L3.99971863,5.51471863 L5.51471863,3.99971863 Z M14,4 L12.4847186,3.99971863 L13.9997186,5.51471863 L14,4 Z M8.99929289,1.92822508 L7.92671863,2.99971863 L10.0707186,2.99971863 L8.99929289,1.92822508 Z'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'none'
            },
            backgroundColor: 'rgba(22, 42, 75, 1)',
            borderWidth: 0,
            textStyle: {
                color: '#FFF'
            }
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.60)'
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.60)',
                }
            },
            data: ['5-10', '5-11', '5-12', '5-13', '5-14', '5-15', '5-16']
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            splitNumber: 4,
        },
        series: [{
            name: '矿1',
            type: 'bar',
            data: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
            label: {
                show: true,
                position: 'top',
                color: 'rgba(255, 255, 255, 0.60)',
                fontSize: 9
            }
        }, {
            name: '矿2',
            type: 'bar',
            data: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
            label: {
                show: true,
                position: 'top',
                color: 'rgba(255, 255, 255, 0.60)',
                fontSize: 9
            }
        }, {
            name: '矿3',
            type: 'bar',
            data: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
            label: {
                show: true,
                position: 'top',
                color: 'rgba(255, 255, 255, 0.60)',
                fontSize: 9
            }
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