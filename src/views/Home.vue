<template>
    <div class="common-layout">
        <div class="header">
            <Header></Header>
        </div>
        <div class="main">
            <RouterView />
        </div>
        <div class="footer">
            <Navbar></Navbar>
        </div>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';
import { RouterView } from 'vue-router'


// function handleSelect(index) {
//     console.log(index)
// }
</script>

<style lang="scss" scoped>
.common-layout {
    height: 100%;
    position: relative;

    .header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100px;
        z-index: 99;
    }

    .main {
        position: absolute;
        inset: 0;
    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 150px;
        background-image: url("@/assets/images/main-bottom.png");
        background-size: 100% 100%;
        z-index: 999;
    }


}
</style>