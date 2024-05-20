<template>
    <div class="my-dashboard-message">
        <div class="msg-list">
            <div class="msg-item" v-for="item in systemData" @click="handleClickMsg(item)" :key="item.id">
                <div class="m-up">
                    <span class="m-title"><i class="myiconfont smart-xuanzhong"
                            style="color: #f8ee7b;margin-right: 10px;"></i>{{ item.noticeTitle }}</span>
                    <span class="m-time" v-text="item.createTime"></span>
                </div>
                <div class="m-down">
                    {{ item.noticeContent }}
                </div>

            </div>
        </div>

        <div class="more-btn">

        </div>
    </div>
</template>

<script setup name="MyDashboardMessage">
import { ref } from "vue"

const systemData = ref([{
    id: 1,
    noticeTitle: '某点通风报警',
    createTime: '2020-5-21',
    noticeContent: '【寺河矿】'
}, {
    id: 2,
    noticeTitle: '某点通风报警',
    createTime: '2020-5-21',
    noticeContent: '【寺河矿】'
}, {
    id: 3,
    noticeTitle: '某点通风报警',
    createTime: '2020-5-21',
    noticeContent: '【寺河矿】'
}, {
    id: 4,
    noticeTitle: '某点通风报警',
    createTime: '2020-5-21',
    noticeContent: '【寺河矿】'
}, {
    id: 5,
    noticeTitle: '某点通风报警',
    createTime: '2020-5-21',
    noticeContent: '【寺河矿】'
}, {
    id: 6,
    noticeTitle: '某点通风报警',
    createTime: '2020-5-21',
    noticeContent: '【寺河矿】'
},])

</script>

<style lang="scss" scoped>
.my-dashboard-message {
    position: relative;
    height: 100%;
    font-size: 14px;
    color: #fff;

    .more-btn {
        position: absolute;
        left: 50%;
        bottom: 0;
        height: 24px;
        width: 100px;
        background: url("@/assets/images/lookmore.png") no-repeat;
        transform: translateX(-50%);
        cursor: pointer;
    }

    .msg-list {
        height: calc(100% - 28px);
        position: relative;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(#fff 0%, #fff 75%, transparent 100%);

        // &::before {
        //     content: "";
        //     position: absolute;
        //     right: 0;
        //     bottom: 0;
        //     left: 0;
        //     height: 80px;
        //     // background: linear-gradient(transparent, #0c4053);
        //     background:linear-gradient(transparent 0%, #0c4053 50%, #0c4053 100%);
        // }


        .msg-item {
            cursor: pointer;
            height: 40px;
            margin-bottom: 5px;

            .m-up {
                display: flex;
                justify-content: space-between;

            }

            .m-down {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 12px;
                color: #7dafb9;
            }

            .m-title {
                flex: 1;
                width: 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-right: 20px;
                font-size: 14px;
            }

            .m-time {
                width: 70px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }


}
</style>