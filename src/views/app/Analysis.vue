<template>
    <div class="analysis">
        <div class="map">
            <MyMap></MyMap>
        </div>
        <div class="card left-card">
            <div class="maoboli">
                <MyTitle>数据统计</MyTitle>
                <div class="left-box-1">
                    <MyInfoTile title="检测" :content="22">
                        <i class="myiconfont smart-xunjianguanli"
                            style="font-size: 30px; background-image: linear-gradient( 180deg, #44D493 0%, rgba(68,212,147,0) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></i>
                    </MyInfoTile>
                    <MyInfoTile title="预警" :content="22">
                        <i class="myiconfont smart-xunjianguanli"
                            style="font-size: 30px; background-image: linear-gradient( 180deg, #FFEA7F 0%, rgba(255,234,127,0) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></i>
                    </MyInfoTile>
                    <MyInfoTile title="报警" :content="22">
                        <i class="myiconfont smart-xunjianguanli"
                            style="font-size: 30px; background-image: linear-gradient( 180deg, #CD585C 0%, rgba(205,88,92,0) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></i>
                    </MyInfoTile>
                    <MyInfoTile title="故障" :content="22">
                        <i class="myiconfont smart-xunjianguanli"
                            style="font-size: 30px; background-image: linear-gradient( 180deg, #CD585C 0%, rgba(205,88,92,0) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></i>
                    </MyInfoTile>
                </div>
            </div>
            <div class="geduan"></div>
            <div class="maoboli">
                <MyTitle>瓦斯预警分级统计</MyTitle>
                <div class="left-box-2">
                    <div class="safe area">
                        <div class="area-name">
                            1级
                        </div>
                        <div class="area-num">
                            23
                        </div>

                    </div>
                    <div class="warning area">
                        <div class="area-name">
                            2级
                        </div>
                        <div class="area-num">
                            12
                        </div>
                    </div>
                    <div class="warning2 area">
                        <div class="area-name">
                            3级
                        </div>
                        <div class="area-num">
                            3
                        </div>
                    </div>
                    <div class="grey area">
                        <div class="area-name">
                            4级
                        </div>
                        <div class="area-num">
                            3
                        </div>

                    </div>
                    <div class="danger area">
                        <div class="area-name">
                            5级
                        </div>
                        <div class="area-num">
                            3
                        </div>
                    </div>
                    <div class="blue area">
                        <div class="area-name">
                            6级
                        </div>
                        <div class="area-num">
                            1
                        </div>
                    </div>
                </div>
            </div>
            <div class="maoboli">
                <MyTitle>实时预警报警</MyTitle>
                <div class="left-box-3">
                    <div class="pie-chart">
                        <!-- <CheckPie :optionData="pieData"></CheckPie> -->
                        <ChartPie3D></ChartPie3D>
                    </div>
                    <div class="pie-title">
                        <div class="pie-title-item">
                            <div class="item-l"><i class="myiconfont smart-xuanzhong item-l-icon"
                                    style="color:#44D493 ;"></i>1级预警区</div>
                            <div>{{ 23 }}</div>
                        </div>
                        <div class="pie-title-item">
                            <div class="item-l"><i class="myiconfont smart-xuanzhong item-l-icon"
                                    style="color: #EDE880;"></i>2级预警区</div>
                            <div>{{ 18 }}</div>
                        </div>
                        <div class="pie-title-item">
                            <div class="item-l"><i class="myiconfont smart-xuanzhong item-l-icon"
                                    style="color: #c86104;"></i>1级报警区</div>
                            <div>{{ 2 }}</div>
                        </div>
                        <div class="pie-title-item">
                            <div class="item-l"><i class="myiconfont smart-xuanzhong item-l-icon"
                                    style="color: #ED554E;"></i>2级报警区</div>
                            <div>{{ 1 }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="maoboli">
                <MyTitle>每日六级预警报警数量</MyTitle>
                <div class="left-box-4">
                    <ChartLine></ChartLine>
                </div>
            </div>
        </div>
        <div class="card right-card">
            <div class="maoboli">
                <MyTitle>消息通知</MyTitle>
                <div class="right-box-1">
                    <MyDashboardMessage></MyDashboardMessage>
                </div>
            </div>
            <div class="geduan"></div>
            <div class="maoboli">
                <MyTitle>实时报警信息</MyTitle>
                <div class="right-box-2">
                    <el-table :data="tableData" style="width: 100%" height="200px">
                        <el-table-column prop="name" label="煤矿名称" />
                        <el-table-column prop="type" label="矿井类型" />
                        <el-table-column prop="level" label="瓦斯等级" />
                        <el-table-column prop="check" label="测点数量" />
                    </el-table>
                </div>
            </div>
            <div class="geduan"></div>
            <div class="maoboli">
                <MyTitle>视频监控</MyTitle>
                <div class="video-list">
                    <img :src="Temp1" style="width: 100%;height: 90px;object-fit: fill;">
                    <img :src="Temp2" style="width: 100%;height: 90px;object-fit: fill;">
                    <img :src="Temp3" style="width: 100%;height: 90px;object-fit: fill;">
                    <img :src="Temp4" style="width: 100%;height: 90px;object-fit: fill;">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import MyMap from "@/components/MyMap.vue"
import MyTitle from '@/components/MyTitle/index.vue';
import MyInfoTile from '@/components/MyInfoTile/index.vue';
import MyDashboardMessage from '@/components/MyDashboardMessage/index.vue'
import ChartPie3D from '@/components/ChartPie3D.vue';
import ChartLine from '@/components/ChartLine.vue';
import Temp1 from '@/assets/temp1.png';
import Temp2 from '@/assets/temp2.png';
import Temp3 from '@/assets/temp3.jpg';
import Temp4 from '@/assets/temp4.jpg';

const tableData = [
    {
        name: '寺河矿',
        type: '大型矿',
        level: '高瓦斯矿井',
        check: 80
    },
    {
        name: '寺河矿',
        type: '大型矿',
        level: '高瓦斯矿井',
        check: 80
    }, {
        name: '寺河矿',
        type: '大型矿',
        level: '高瓦斯矿井',
        check: 80
    }, {
        name: '寺河矿',
        type: '大型矿',
        level: '高瓦斯矿井',
        check: 80
    }, {
        name: '寺河矿',
        type: '大型矿',
        level: '高瓦斯矿井',
        check: 80
    }, {
        name: '寺河矿',
        type: '大型矿',
        level: '高瓦斯矿井',
        check: 80
    }, {
        name: '寺河矿',
        type: '大型矿',
        level: '高瓦斯矿井',
        check: 80
    }, {
        name: '寺河矿',
        type: '大型矿',
        level: '高瓦斯矿井',
        check: 80
    }, {
        name: '寺河矿',
        type: '大型矿',
        level: '高瓦斯矿井',
        check: 80
    }, {
        name: '寺河矿',
        type: '大型矿',
        level: '高瓦斯矿井',
        check: 80
    }, {
        name: '寺河矿',
        type: '大型矿',
        level: '高瓦斯矿井',
        check: 80
    }, {
        name: '寺河矿',
        type: '大型矿',
        level: '高瓦斯矿井',
        check: 80
    },
]


</script>

<style lang="scss" scoped>
.analysis {
    height: 100%;
    position: relative;
    background-image: url('@/assets/images/main-bg.png');
    background-size: 100% 100%;
    color: #fff;

    .map {
        position: absolute;
        inset: 0;
    }

    .card {
        width: 420px;
        top: 108px;
        position: absolute;
        z-index: 999;
    }


    .left-card {
        left: 32px;

        .left-box-1 {
            margin-top: 10px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        .left-box-2 {
            margin-top: 10px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-row-gap: 10px;
            justify-items: center;

            .area {
                height: 90px;
                width: 90px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                position: relative;

                .area-name {
                    position: absolute;
                    left: 50%;
                    top: 55%;
                    transform: translateX(-50%);
                    font-size: 14px;
                    color: #fff;
                }

                .area-num {
                    position: absolute;
                    left: 50%;
                    top: 16px;
                    transform: translateX(-50%);
                    font-size: 32px;
                    color: #FFEA7F;
                }
            }
        }

        .left-box-3 {
            display: flex;
            height: 200px;
            margin-top: 10px;

            .pie-chart {
                width: 212px;
                height: 200px;
            }

            .pie-title {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;

                .pie-title-item {
                    width: 165px;
                    height: 28px;
                    background: #3D5C9910;
                    padding: 0 12px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .item-l {
                        display: flex;
                        align-items: center;

                        .item-l-icon {
                            font-size: 16px;
                            margin-right: 0.5em;
                        }
                    }
                }
            }
        }

        .left-box-4 {
            margin-top: 10px;
            height: 200px;
            background-image: url("@/assets/images/chart-box.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
    }

    .right-card {
        right: 32px;

        .right-box-1 {
            margin-top: 10px;
            height: 250px;
            padding: 10px;
        }

        .right-box-2 {
            margin-top: 10px;
            height: 250px;
            background-image: url("@/assets/images/table-bg.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            padding: 15px;
        }

        .video-list {
            margin-top: 10px;
            height: 180px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
        }
    }

    .safe {
        background-image: url("@/assets/images/safe-area.png");
    }

    .warning {
        background-image: url("@/assets/images/warning-area.png");
    }

    .warning2 {
        background-image: url("@/assets/images/warning2-area.png");
    }

    .danger {
        background-image: url("@/assets/images/danger-area.png");
    }

    .grey {
        background-image: url("@/assets/images/grey-area.png");
    }

    .blue {
        background-image: url("@/assets/images/blue-area.png");
    }
}

.maoboli {
    backdrop-filter: blur(10px);
}

.geduan {
    height: 20px;
}


::v-deep .el-table,
.el-table__expanded-cell {
    background-color: transparent !important;
    color: #fff;
}

::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
    background-color: transparent;
}

::v-deep .el-table__header .el-table__cell {
    background-color: transparent !important;
    color: #fff;
}
</style>