<template>
    <div class="header">
        <div class="title">一通三防智慧化监管平台</div>

        <div class="title-left">
            <el-avatar src="../assets/logo.svg" />
            <div class="user-info">管理员:尼克</div>
        </div>
        <div class="title-right">
            <div class="clock">
                <div class="time">
                    {{ timeString }}
                </div>
                <div class="date">
                    {{ dateString }}
                </div>
            </div>
            <div class="setting">
                <el-button type="primary" @click="triggerFullScreen">全屏</el-button>
            </div>
            <div class="logout">

                <el-dropdown @command="handleCommand">
                    <span class="username">
                        <span>nick</span>
                        <i class="myiconfont smart-xiala"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let timer
const dateString = ref()
const timeString = ref()

function getCurrentTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dates = date.getDate();
    const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',];
    let day = arr[date.getDay()];
    dateString.value = month + '月' + dates + '日 ' + day

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;
    timeString.value = hours + ":" + minutes + ":" + seconds;
}


function clock() {
    timer = setInterval(getCurrentTime, 1000);
}
function logout() {
    router.push('/login')
}

const handleCommand = (command) => {
    if (command === 'logout') {
        logout()
    }
}


function triggerFullScreen() {
    fullScreen(document.documentElement);
}

// 进入全屏
function fullScreen(el) {
    var rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen,
        wscript;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
        return;
    }
    if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript) {
            wscript.SendKeys("{F11}");
        }
    }
}

function init() {
    if (timer) {
        clearInterval(timer)
    }
    getCurrentTime()
    clock()
}
init()
</script>

<style lang="scss" scoped>
.header {
    position: relative;
    width: 100%;
    height: 100%;
    color: #F0F5FF;
    background: linear-gradient(#032834, transparent);

    .title {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 91px;
        background-image: url("@/assets/images/main-title.png");
        background-size: 100% 100%;
        font-size: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'PangMenZhengDao';
        text-shadow: inset 0px -1px 0px #E6FBFF;
    }

    .title-left {
        position: absolute;
        top: 0;
        left: 0;
        height: 80px;
        width: 500px;
        display: flex;
        align-items: center;
        padding-left: 32px;

        .user-info {
            margin-left: 6px;
            font-size: 16px;
        }
    }

    .title-right {
        position: absolute;
        top: 0;
        right: 0;
        height: 80px;
        display: flex;
        justify-content: end;
        z-index: 9;

        .logout {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;

            .username {
                font-size: 16px;
                color: #F0F5FF;
                cursor: pointer;
            }

        }

        .setting {
            display: flex;
            align-items: center;
            margin: 0 20px;
        }

        .clock {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;

            .time {
                font-size: 20px;
                color: #F0F5FF;
                letter-spacing: 2px;
            }

            .date {
                font-size: 12px;
                color: #F0F5FF;
            }
        }
    }
}
</style>