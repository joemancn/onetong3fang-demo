<template>
    <div class="my-title">
        <slot></slot>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.my-title {
    height: 40px;
    background: url('@/assets/images/c-title-bg.png') no-repeat;
    background-position: left center;
    background-size: contain;
    line-height: 36px;
    font-family: 'AlibabaPuHuiTi_2_85_Bold';
    text-shadow: 0px 2px 2px #002F38;
    color: #B3D9FF;
    font-size: 20px;
    padding-left: 45px;

}
</style>