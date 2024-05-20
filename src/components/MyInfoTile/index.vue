<template>
    <div class="my-info-tile">
        <div class="left">
            <slot></slot>
        </div>
        <div class="right">
            <div class="title">
                <span class="title-text">{{ title }}</span>
            </div>
            <div class="content">
                <span class="content-text">{{ content }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['title', 'content'])

</script>

<style lang="scss" scoped>
.my-info-tile {
    width: 91px;
    height: 65px;
    // background-color: #fff;
    background-image: url('@/assets/images/info-tile-b.png');
    background-repeat: no-repeat;
    background-position: 0 100%;
    background-size: 100% auto;
    display: flex;
    align-items: center;

    .left {
        margin-right: 6px;

        &>* {
            font-size: 40px;
            color: #fff;
        }
    }

    .title-text {
        font-size: 14px;
        color: #fff;
        white-space: nowrap;
        font-family: 'AlibabaPuHuiTi_2_85_Bold';
    }

    .content-text {
        font-weight: bold;
        font-size: 24px;
        color: #FFEA7F;
        line-height: 37px;
    }
}
</style>