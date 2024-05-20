<template>
    <div class="container">
        <div class="navbar">
            <!-- <NavBtn v-for="item in menulist" :routerItem="item" :key="item.name"></NavBtn> -->
            <NavBtn1></NavBtn1>
            <NavBtn2></NavBtn2>
            <NavBtn3></NavBtn3>
            <NavBtn4></NavBtn4>
            <NavBtn5></NavBtn5>
        </div>
    </div>

</template>

<script setup>
import { ref } from "vue";
import NavBtn1 from "./NavBtn1.vue";
import NavBtn2 from "./NavBtn2.vue";
import NavBtn3 from "./NavBtn3.vue";
import NavBtn4 from "./NavBtn4.vue";
import NavBtn5 from "./NavBtn5.vue";
const wsList = [{
    name: '总体势态',
    path: 'index',
    icon: 'home'
}, {
    name: '智能分析',
    path: '',
    icon: 'znfx',
    showChildren: true,
    children: [{
        name: '实时数据',
        path: 'realtime',
        icon: 'sssj'
    }, {
        name: '历史数据',
        path: 'history',
        icon: 'mission'
    }, {
        name: '数据分析',
        path: 'analyze',
        icon: 'sjfx'
    }]
}, {
    name: '巡检管理',
    path: 'check',
    icon: 'xjgl'
}, {
    name: '预警报警',
    path: 'warning',
    icon: 'alert'
}, {
    name: '应急管理',
    path: 'emergency',
    icon: 'yjgl'
}, {
    name: '故障管理',
    path: 'fault',
    icon: 'gzgl'
}, {
    name: '报告报表',
    path: 'report',
    icon: 'report'
}, {
    name: '设备管理',
    path: 'device',
    icon: 'remote'
}, {
    name: '系统配置',
    path: 'sysConfig',
    icon: 'yjfx'
}]

const menulist = ref(wsList)
</script>

<style lang="scss" scoped>
@use 'sass:math';

.container {
    height: 100%;
    background: linear-gradient(transparent, #032834);
    display: flex;
    align-items: center;
    justify-content: center;
}

.navbar {
    display: flex;
    justify-content: space-between;


    .bottom-item {
        position: relative;

        &+.bottom-item {
            // margin-left: 44px;
        }
    }


    .third-box {
        position: absolute;
        top: -120px;
        left: 50%;
        transform: translateX(-50%);
        height: 112px;
        width: 263px;
        z-index: 99999;
        background: url("@/assets/images/thrid-box.png") no-repeat;
        background-size: 100% auto;

        $r: 120px;
        $n: 3;
        $step: calc(180deg / ($n + 1));

        @for $i from 1 through $n {
            .third-btn:nth-child(#{$i}) {
                position: absolute;
                left: 50%;
                bottom: -60px;
                margin-left: -22.5px;
                $deg : $step * $i;
                $x: -$r * math.cos($deg);
                $y: -$r * math.sin($deg);
                @debug $x $y;
                transform: translate($x, $y);
            }
        }

        // .third-btn:nth-child(1) {
        //     position: absolute;
        //     left: 50%;
        //     bottom: -60px;
        //     margin-left: -22.5px;
        //     $deg : $step * 1;
        //     $x: -$r * math.cos($deg);
        //     $y: -$r * math.sin($deg);
        //     @debug $x $y;
        //     transform: translate($x, $y);
        // }

        // .third-btn:nth-child(2) {
        //     position: absolute;
        //     left: 50%;
        //     bottom: -60px;
        //     margin-left: -22.5px;
        //     $deg : $step * 2;
        //     $x: -$r * math.cos($deg);
        //     $y: -$r * math.sin($deg);
        //     @debug $x $y;
        //     transform: translate($x, $y);
        // }


    }
}
</style>