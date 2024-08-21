<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userLogin, userRegister } from '@/api/user.js'
import { ElMessage } from 'element-plus'
const isRegister = ref(true)

const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
const form = ref()

//校验规则
const rules = {
  username: [
    /* 验证用户名输入的规则配置 */
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    } /* 当输入框失去焦点时，验证是否输入了用户名 */,
    {
      min: 5,
      max: 10,
      message: '用户名必须是5-10位的字符',
      trigger: 'blur'
    } /* 当输入框失去焦点时，验证用户名长度是否在5-10位之间 */
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15的非空字符',
      trigger: 'blur'
    },
    {
      //value为当前输入的值,rule当前规则,callback为验证成功或失败的回调函数
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback() //验证成功
        }
      },
      trigger: 'blur'
    }
  ]
}

const register = async () => {
  // 验证表单
  const isValid = await form.value.validate()
  if (!isValid) {
    ElMessage.error('表单验证失败，请检查您的输入')
    return
  }

  try {
    const res = await userRegister(formModel.value)
    // console.log(res);

    // 检查响应数据
    if (res) {
      ElMessage.success(res.data.message || '注册成功')
      isRegister.value = false
    } else {
      ElMessage.error('服务器返回的数据格式有误')
    }
  } catch (error) {
    // 记录错误日志
    console.error('注册失败:', error)
    ElMessage.error(error.message || '注册失败，请稍后再试')
  }
}
const login =async () => {
  // 验证表单
  const isValid = form.value.validate()
  if (!isValid) {
    ElMessage.error('表单验证失败，请检查您的输入')
    return
  }
  //登陆
 const res = await userLogin(formModel.value)


  // 模拟登录成功
  ElMessage.success('登录成功')
}
//切换到登陆,重置表单内容
// eslint-disable-next-line no-undef
watch(isRegister, () => {
    formModel.value = {
      username: '',
      password: '',
      repassword: ''
    }

})
</script>

<template>
  <!--  el-row 一行分成了24分-->
  <!--  ref="ruleFormRef" &lt;!&ndash; 设置ref属性以便通过引用访问表单实例 &ndash;&gt;
    :model="ruleForm" &lt;!&ndash; 绑定表单数据模型 &ndash;&gt;
    :rules="rules" &lt;!&ndash; 绑定验证规则 &ndash;&gt;
    -->
  <!---->
  <el-row class="login-page">
    <!--    span=12 占了12份-->
    <!--    offset距离左侧的距离-->
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!--      注册功能-->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!--      登陆功能-->
      <el-form :model="formModel" :rules=rules ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click='login' class="button" type="primary" auto-insert-space
            >登录
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
