<template>
    <div class="register-container">
        <div class="register-card">
            <div class="logo-section">
                <LogoIcon class="logo-icon" />
                <h1 class="logo-text">知汇</h1>
            </div>
            <h2 class="welcome-text">欢迎加入知汇</h2>
            
            <form class="register-form" @submit.prevent="handleRegister">
                <div class="form-group">
                    <label>用户名</label>
                    <input 
                        type="text" 
                        v-model="registerForm.username" 
                        placeholder="请输入用户名"
                        class="form-input"
                    />
                </div>

                <div class="form-group">
                    <label>账号</label>
                    <input 
                        type="text" 
                        v-model="registerForm.account" 
                        placeholder="请输入手机号/邮箱"
                        class="form-input"
                    />
                </div>
                
                <div class="form-group">
                    <label>密码</label>
                    <div class="password-input-wrapper">
                        <input 
                            :type="showPassword ? 'text' : 'password'" 
                            v-model="registerForm.password" 
                            placeholder="请输入密码"
                            class="form-input"
                        />
                        <div class="password-toggle" @click="showPassword = !showPassword">
                            <EyeIcon v-if="showPassword" />
                            <EyeOffIcon v-else />
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label>确认密码</label>
                    <div class="password-input-wrapper">
                        <input 
                            :type="showConfirmPassword ? 'text' : 'password'" 
                            v-model="registerForm.confirmPassword" 
                            placeholder="请再次输入密码"
                            class="form-input"
                        />
                        <div class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                            <EyeIcon v-if="showConfirmPassword" />
                            <EyeOffIcon v-else />
                        </div>
                    </div>
                </div>

                <div class="form-options">
                    <label class="agree-terms">
                        <input type="checkbox" v-model="registerForm.agreeTerms">
                        <span>我已阅读并同意<a href="#" class="terms-link">服务条款</a>和<a href="#" class="terms-link">隐私政策</a></span>
                    </label>
                </div>

                <button type="submit" class="register-button" :disabled="!registerForm.agreeTerms">注册</button>

                <div class="login-link">
                    已有账号？ <a href="#" @click.prevent="goToLogin">立即登录</a>
                </div>
            </form>
        </div>
        <div class="register-footer">
            <div class="slogan">知识，让生活更美好</div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/user'
import { message } from 'ant-design-vue'
import LogoIcon from '@/assets/logo-brain.svg'
import EyeIcon from '@/assets/icon-eye.svg'
import EyeOffIcon from '@/assets/icon-eye-off.svg'

const router = useRouter()
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const registerForm = reactive({
    username: '',
    account: '', // 用于存储手机号或邮箱
    password: '',
    confirmPassword: '',
    agreeTerms: false
})

// 验证手机号
const isValidPhone = (phone) => {
    return /^1[3-9]\d{9}$/.test(phone)
}

// 验证邮箱
const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

const handleRegister = async () => {
    // 表单验证
    if (!registerForm.username) {
        message.error('请输入用户名')
        return
    }
    if (!registerForm.account) {
        message.error('请输入手机号或邮箱')
        return
    }
    if (!registerForm.password) {
        message.error('请输入密码')
        return
    }
    if (registerForm.password !== registerForm.confirmPassword) {
        message.error('两次输入的密码不一致')
        return
    }
    if (!registerForm.agreeTerms) {
        message.error('请阅读并同意服务条款和隐私政策')
        return
    }

    // 判断是手机号还是邮箱
    const isPhone = isValidPhone(registerForm.account)
    const isEmail = isValidEmail(registerForm.account)

    if (!isPhone && !isEmail) {
        message.error('请输入正确的手机号或邮箱')
        return
    }

    try {
        const params = {
            username: registerForm.username,
            password: registerForm.password,
            phone: isPhone ? registerForm.account : '',
            email: isEmail ? registerForm.account : ''
        }

        await register(params)
        message.success('注册成功')
        router.push('/login')
    } catch (error) {
        console.error('注册失败:', error)
    }
}

const goToLogin = () => {
    router.push('/login')
}
</script>

<style scoped>
.register-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.register-card {
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

.register-form {
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

.agree-terms {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
}

.terms-link {
    color: #2a6ebb;
    text-decoration: none;
}

.terms-link:hover {
    text-decoration: underline;
}

.register-button {
    width: 100%;
    padding: 12px;
    background-color: #2a6ebb;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.register-button:hover:not(:disabled) {
    background-color: #215a9e;
}

.register-button:disabled {
    background-color: #a0cfff;
    cursor: not-allowed;
}

.login-link {
    text-align: center;
    font-size: 14px;
    color: #606266;
}

.login-link a {
    color: #2a6ebb;
    text-decoration: none;
    font-weight: 500;
}

.login-link a:hover {
    text-decoration: underline;
}

.register-footer {
    margin-top: 40px;
    text-align: center;
}

.slogan {
    color: #909399;
    font-size: 14px;
}
</style> 