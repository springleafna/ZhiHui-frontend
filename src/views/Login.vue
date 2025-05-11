<template>
    <div class="login-container">
        <div class="login-card">
            <div class="logo-section">
                <LogoIcon class="logo-icon" />
                <h1 class="logo-text">知汇</h1>
            </div>
            <h2 class="welcome-text">欢迎回到知汇</h2>
            
            <form class="login-form" @submit.prevent="handleLogin">
                <div class="form-group">
                    <label>账号</label>
                    <input 
                        type="text" 
                        v-model="loginForm.account" 
                        placeholder="请输入手机号/邮箱"
                        class="form-input"
                    />
                </div>
                
                <div class="form-group">
                    <label>密码</label>
                    <div class="password-input-wrapper">
                        <input 
                            :type="showPassword ? 'text' : 'password'" 
                            v-model="loginForm.password" 
                            placeholder="请输入密码"
                            class="form-input"
                        />
                        <div class="password-toggle" @click="showPassword = !showPassword">
                            <EyeIcon v-if="showPassword" />
                            <EyeOffIcon v-else />
                        </div>
                    </div>
                </div>

                <div class="form-options">
                    <label class="remember-me">
                        <input type="checkbox" v-model="loginForm.remember">
                        <span>记住账号</span>
                    </label>
                    <a href="#" class="forgot-password">忘记密码？</a>
                </div>

                <button type="submit" class="login-button">登录</button>

                <div class="divider">
                    <span>或</span>
                </div>

                <div class="social-login">
                    <button class="social-button wechat">
                        <WechatIcon />
                    </button>
                    <button class="social-button qq">
                        <QQIcon />
                    </button>
                    <button class="social-button weibo">
                        <WeiboIcon />
                    </button>
                </div>

                <div class="register-link">
                    还没有账号？ <a href="#" @click="goToRegister">立即注册</a>
                </div>
            </form>
        </div>
        <div class="login-footer">
            <div class="slogan">知识，让生活更美好</div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { loginByPassword } from '@/api/user'
import { message } from 'ant-design-vue'
import LogoIcon from '@/assets/logo-brain.svg'
import WechatIcon from '@/assets/icon-wechat.svg'
import QQIcon from '@/assets/icon-qq.svg'
import WeiboIcon from '@/assets/icon-weibo.svg'
import EyeIcon from '@/assets/icon-eye.svg'
import EyeOffIcon from '@/assets/icon-eye-off.svg'

const router = useRouter()
const showPassword = ref(false)
const loginForm = reactive({
    account: '',
    password: '',
    remember: false
})

const handleLogin = async () => {
    try {
        await loginByPassword(loginForm.account, loginForm.password)
        router.push('/dashboard') // 登录成功后跳转到首页
    } catch (error) {
        console.error('登录失败:', error)
    }
}

const goToRegister = () => {
    router.push('/register')
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;
    padding: 20px;
}

.login-card {
    background: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 420px;
}

.logo-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;
}

.logo-text {
    font-size: 24px;
    font-weight: 600;
    color: #2a6ebb;
    margin: 0;
    line-height: 32px;
}

.welcome-text {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    color: #303133;
    margin-bottom: 32px;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-size: 14px;
    color: #606266;
    font-weight: 500;
}

.form-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s ease;
    box-sizing: border-box;
}

.form-input:focus {
    border-color: #2a6ebb;
    box-shadow: 0 0 0 2px rgba(42, 110, 187, 0.1);
    outline: none;
}

.password-input-wrapper {
    position: relative;
}

.password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #909399;
}

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.remember-me {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
}

.forgot-password {
    font-size: 14px;
    color: #2a6ebb;
    text-decoration: none;
}

.login-button {
    width: 100%;
    padding: 12px;
    background-color: #2a6ebb;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}

.login-button:hover {
    background-color: #215a9e;
}

.divider {
    display: flex;
    align-items: center;
    text-align: center;
    color: #909399;
    font-size: 14px;
    margin: 20px 0;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #dcdfe6;
}

.divider span {
    padding: 0 16px;
}

.social-login {
    display: flex;
    justify-content: center;
    gap: 16px;
}

.social-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #dcdfe6;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
}

.social-button :deep(svg) {
    width: 32px;
    height: 32px;
}

.social-button:hover {
    background-color: #f5f7fa;
    border-color: #c0c4cc;
}

.register-link {
    text-align: center;
    font-size: 14px;
    color: #606266;
}

.register-link a {
    color: #2a6ebb;
    text-decoration: none;
    font-weight: 500;
}

.register-link a:hover {
    text-decoration: underline;
}

.login-footer {
    margin-top: 40px;
    text-align: center;
}

.slogan {
    color: #909399;
    font-size: 14px;
}
</style> 