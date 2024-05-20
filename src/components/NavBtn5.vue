<template>
    <div class="nav-btn-1" @click="handleClick">
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute()
function handleClick() {
    router.push('/report')

}
</script>

<style lang="scss" scoped>
.nav-btn-1 {
    margin-left: 10px;
    margin-right: 10px;
    height: 56px;
    width: 102px;
    background-image: url('../assets/images/NavBtn5.png');
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    cursor: pointer;

    &:hover {
        background-image: url('../assets/images/NavBtn5-active.png');
    }
}
</style>