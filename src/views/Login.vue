<template>
    <div class="login_container">
        <img :src="MainTitle" class="main-title">

        <div class="login_box">
            <!-- 登录表单区域 -->
            <el-form ref="loginFormRef" :model="loginForm" label-width="0px" class="login_form">
                <!-- 用户名 -->
                <el-form-item>
                    <el-input v-model="loginForm.username" prefix-icon="User" size="large"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item>
                    <el-input v-model="loginForm.password" type="password" prefix-icon="Lock" size="large"></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button style="width: 100%;" @click="login" size="large">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import MainTitle from '@/assets/images/title.png'

const router = useRouter()

const loginForm = reactive({
    username: 'admin',
    password: 'admin'
})

function login() {
    router.push('/home')
}
</script>

<style lang="scss" scoped>
.login_container {
    position: relative;
    background-color: #2b4b6b;
    background: url('../assets/images/login.png') no-repeat;
    background-size: 100% 100%;
    height: 100%;
}

.main-title {
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translate(-50%, 0);
}

.login_box {
    width: 450px;
    height: 300px;
    // background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 340px;
    transform: translate(-50%, 0);

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: flex-end;
}
</style>