<template>
    <div class="nav-btn-1" @click="handleClick">
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute()
function handleClick(event) {
    console.log(route);
    // 跳转到分析页面(如果当前页面不是这
    if (route.path === '/analysis') {
        router.push('/dashboard')
    } else {
        router.push('/analysis')
    }
}
</script>

<style lang="scss" scoped>
.nav-btn-1 {
    margin-left: 10px;
    margin-right: 10px;
    height: 56px;
    width: 102px;
    background-image: url('../assets/images/NavBtn1.png');
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    cursor: pointer;

    &:hover {
        background-image: url('../assets/images/NavBtn1-active.png');
    }
}
</style>