<template>
    <div class="bottom-item">
        <div class="nav-btn-1" @click.native="triggerThirdBtn">
        </div>
        <div v-show="showThirdBox" class="third-box" ref="znfx">
            <ThirdBtn class="third-btn" type="sssj" label="实时数据" />
            <ThirdBtn class="third-btn" type="mission" label="历史数据" />
            <ThirdBtn class="third-btn" type="sjfx" label="数据分析" />
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import ThirdBtn from '@/components/ThirdBtn/index.vue'

const showThirdBox = ref(false)

function triggerThirdBtn() {
    // showThirdBox.value = !showThirdBox.value
    if (showThirdBox.value) {
        closeThirdMenu()
    } else {
        openThirdMenu()
    }
}
function openThirdMenu() {
    showThirdBox.value = true
    // console.log('打开', showThirdBox.value);
    gsap.to('.third-box', {
        y: -0,
        scale: 1,
        // duration: 0.2,
        opacity: 1,
        ease: "back.out(2)",
    })
}

function closeThirdMenu() {
    gsap.to('.third-box', {
        scale: 0,
        y: 100,
        // duration: 0.2,
        ease: "power2.in",
        opacity: 0,
        onComplete: () => {
            showThirdBox.value = false
            // console.log('关闭', showThirdBox.value);
        }
    })
}
</script>

<style lang="scss" scoped>
@use 'sass:math';

.nav-btn-1 {
    margin-left: 10px;
    margin-right: 10px;
    height: 56px;
    width: 102px;
    background-image: url('../assets/images/NavBtn3.png');
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    cursor: pointer;

    &:hover {
        background-image: url('../assets/images/NavBtn3-active.png');
    }
}

.bottom-item {
    position: relative;
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
}
</style>