<template>
    <div class="disaster-btn" :style="{
        '--icon': `url(${disasterType.icon})`,
        '--btn-width': '45px',
        '--btn-height': '45px',
        '--icon-width': '24px',
        '--icon-height': '24px',
        '--base-width': '45px',
        '--base-height': '45px',
    }">
        <div class="base" />
        <div class="icon" />
        <div class="name">
            {{ label }}
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue"
import Home from "@/assets/images/home.png";
import Air from "@/assets/images/air.png";
import Alert from "@/assets/images/alert.png";
import Dust from "@/assets/images/dust.png";
import Fault from "@/assets/images/fault.png";
import FireIn from "@/assets/images/fire-in.png";
import FireOut from "@/assets/images/fire-out.png";
import Gas from "@/assets/images/gas.png";
import Mission from "@/assets/images/mission.png";
import Radio from "@/assets/images/radio.png";
import Remote from "@/assets/images/remote.png";
import Report from "@/assets/images/report.png";
import Setting from "@/assets/images/setting.png";
import Top from "@/assets/images/top.png";
import Water from "@/assets/images/water.png";
import BJFX from "@/assets/images/bjfx.png";
import DRXj from "@/assets/images/drxj.png";
import GZGL from "@/assets/images/gzgl.png";
import LSXJ from "@/assets/images/lsxj.png";
import SJFX from "@/assets/images/sjfx.png";
import SSSj from "@/assets/images/sssj.png";
import XJGL from "@/assets/images/xjgl.png";
import XJHF from "@/assets/images/xjhf.png";
import YCFX from "@/assets/images/ycfx.png";
import YJFX from "@/assets/images/yjfx.png";
import YJGL from "@/assets/images/yjgl.png";
import ZNFX from "@/assets/images/znfx.png";

const { type, size, label } = defineProps({
    type: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    }
})



const disasterType = computed(() => {
    switch (type) {
        case 'home':
            return { icon: Home };
        case 'air': // 通风
            return { icon: Air };
        case 'alert': // 报警
            return { icon: Alert };
        case 'dust':
            return { icon: Dust };
        case 'fault':
            return { icon: Fault };
        case 'fire-in':
            return { icon: FireIn };
        case 'fire-out':
            return { icon: FireOut };
        case 'gas':
            return { icon: Gas };
        case 'mission':
            return { icon: Mission };
        case 'radio':
            return { icon: Radio };
        case 'remote':
            return { icon: Remote };
        case 'report':
            return { icon: Report };
        case 'setting':
            return { icon: Setting };
        case 'top':
            return { icon: Top };
        case 'water':
            return { icon: Water };
        case 'bjfx':
            return { icon: BJFX };
        case 'drxj':
            return { icon: DRXj };
        case 'gzgl':
            return { icon: GZGL };
        case 'lsxj':
            return { icon: LSXJ };
        case 'sjfx':
            return { icon: SJFX };
        case 'sssj':
            return { icon: SSSj };
        case 'xjgl':
            return { icon: XJGL };
        case 'xjhf':
            return { icon: XJHF };
        case 'ycfx':
            return { icon: YCFX };
        case 'yjfx':
            return { icon: YJFX };
        case 'yjgl':
            return { icon: YJGL };
        case 'znfx':
            return { icon: ZNFX };
        default:
            return { icon: Home };
    }
})


const BtnSize = computed(() => {
    if (size === 'large') {
        return {
            btnWidth: '6.81vw',
            btnHeight: '5.64vw',
            iconWidth: '2.5vw',
            iconHeight: '2.5vw',
            baseWidth: '6.8vw',
            baseHeight: '3.78vw',
        }
    } else if (size === 'small') {
        return {
            btnWidth: '3.72vw',
            btnHeight: '3.3vw',
            iconWidth: '1.22vw',
            iconHeight: '1.22vw',
            baseWidth: '3.72vw',
            baseHeight: '2.07vw',
        }
    } else {
        return {
            btnWidth: '4.68vw',
            btnHeight: '3.88vw',
            iconWidth: '1.49vw',
            iconHeight: '1.49vw',
            baseWidth: '4.68vw',
            baseHeight: '2.34vw',
        }
    }
})


const emit = defineEmits({})

// function handleClick () {
//     emit('click')
// }
</script>

<style lang="scss" scoped>
.disaster-btn {
    position: relative;
    width: var(--btn-width);
    height: var(--btn-height);
    cursor: pointer;

    .name {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        bottom: -20px;
        font-family: 'AlibabaPuHuiTi_2_85_Bold';
        font-size: 14px;
        white-space: nowrap;
        color: #09546B;
        text-shadow: 2px 2px 9px rgba(94, 209, 234, 0.48);
    }

    .icon {
        position: absolute;
        width: var(--icon-width);
        height: var(--icon-height);
        left: 50%;
        top: 20%;
        transform: translate(-50%, 0);
        background: linear-gradient(180deg, rgba(0, 213, 255, 1) 0%, #00D4FF 100%), radial-gradient(0% 60% at 17% 6%, #E6FBFF 0%, rgba(0, 213, 255, 1) 100%), radial-gradient(0% 100% at 86% 100%, #E6FBFF 0%, rgba(0, 213, 255, 1) 100%);
        -webkit-mask-image: var(--icon);
        mask-image: var(--icon);
        mask-repeat: no-repeat;
        mask-size: contain;
    }

    .base {
        position: absolute;
        width: var(--base-width);
        height: var(--base-height);
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 0);
        background: url('./assets/btn.png')no-repeat;
        background-position: center bottom;
        background-size: 100% auto;

    }

    &:hover {
        .icon {
            background: linear-gradient(180deg, rgba(255, 234, 127, 1) 0%, #FFEA7F 100%), radial-gradient(0% 60% at 17% 6%, #FFFBE6 0%, rgba(255, 234, 127, 1) 100%, rgba(255, 213, 0, 1) 100%), radial-gradient(0% 100% at 86% 100%, #FFFBE6 0%, rgba(255, 234, 127, 1) 100%);
        }

        .base {
            background: url('./assets/btn-active.png')no-repeat;
            background-position: center bottom;
            background-size: 100% auto;

        }


    }

    &.current {
        .icon {
            background-image: var(--icon-active);
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;
        }

        .base {
            background: url('./assets/btn-active.png')no-repeat;
            background-position: center bottom;
            background-size: 100% auto;
        }


    }
}
</style>