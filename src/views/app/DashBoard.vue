<template>
    <div class="dashboard">
        <div class="map">
            <BaiduMap></BaiduMap>
        </div>
        <div class="card left-card">
            <div class="left-table">
                <div class="box-back">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="name" label="煤矿名称" />
                        <el-table-column prop="type" label="矿井类型" />
                        <el-table-column prop="level" label="瓦斯等级" />
                        <el-table-column prop="check" label="测点数量" />
                    </el-table>
                </div>
            </div>
        </div>
        <div class="card right-card">
            <div class="box-blue">
                <MyTitle>实时上报信息栏</MyTitle>
                <div class="right-box-1">
                    <MyDashboardMessage></MyDashboardMessage>
                </div>
            </div>
            <div class="box-blue">
                <MyTitle>瓦斯实时报警</MyTitle>
                <div class="right-box-2">
                    <ChartLine></ChartLine>
                </div>
            </div>
            <div class="box-blue">
                <MyTitle>瓦斯抽采量</MyTitle>
                <div class="right-box-3">
                    <ChartBar></ChartBar>
                </div>
            </div>
        </div>
        <div class="mid-tags-box">
            <div class="mid-tag mid-tag-1">
                <div class="tag-text">
                    <div class="tag-title">
                        煤矿数量
                    </div>
                    <div class="tag-content" style="color: #52D9F5;">
                        1577
                    </div>
                </div>
            </div>
            <div class="mid-tag mid-tag-2">
                <div class="tag-text">
                    <div class="tag-title">
                        接入平台数量
                    </div>
                    <div class="tag-content" style="color: #F7CB65;">
                        476
                    </div>
                </div>
            </div>
            <div class="mid-tag mid-tag-3">
                <div class="tag-text">
                    <div class="tag-title">
                        联网测点数量
                    </div>
                    <div class="tag-content" style="color: #52D9F5;">
                        101
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- eslint-disable no-undef -->
<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MyTitle from '@/components/MyTitle/index.vue';
import MyDashboardMessage from '@/components/MyDashboardMessage/index.vue'
import ChartBar from '@/components/ChartBar.vue';
import ChartLine from '@/components/ChartLine.vue';
import BaiduMap from '@/components/BaiduMap.vue';

const router = useRouter();

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

onMounted(() => {

})
</script>

<style lang="scss" scoped>
.dashboard {
    height: 100%;
    position: relative;
    background-color: #051b23;
    color: #fff;

    .map {
        height: 100%;
    }

    .card {
        width: 420px;
        top: 108px;
        position: absolute;
        z-index: 999;
    }

    .left-card {
        left: 32px;

        .left-table {}
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
            height: 200px;
        }

        .right-box-3 {
            margin-top: 10px;
            height: 200px;
        }
    }

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
    background-color: #032834 !important;
    color: #fff;
}

.box-back {
    backdrop-filter: blur(10px);
    margin-bottom: 10px;
    background-color: #03283472;
}

.box-blue {
    margin-bottom: 10px;
    background-color: #032834;
}

.mid-tags-box {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;

    .mid-tag {
        position: relative;
        width: 200px;
        height: 100px;
        color: #fff;

        .tag-text {
            position: absolute;
            top: 20px;
            right: 100px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;


            .tag-title {
                font-size: 12px;
            }

            .tag-content {
                font-weight: bold;
                font-size: 28px;
            }
        }
    }

    .mid-tag-1 {
        background: url('../../assets/images/MidTag1.png') no-repeat;
        background-size: contain;
    }

    .mid-tag-2 {
        background: url('../../assets/images/MidTag2.png') no-repeat;
        background-size: contain;
    }

    .mid-tag-3 {
        background: url('../../assets/images/MidTag3.png') no-repeat;
        background-size: contain;
    }
}
</style>