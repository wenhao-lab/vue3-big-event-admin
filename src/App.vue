<template>
  <div>
    <hr>
    <router-view></router-view>
    <hr>
    {{ userStore.token }}
    <el-button @click="userStore.setToken('settateseta')">登陆</el-button>

    <el-button @click="userStore.removeToken()">退出</el-button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const router = useRouter()
const route = useRoute()
console.log(router, route)

</script>

<style lang="scss" scoped></style>
