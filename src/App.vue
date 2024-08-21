<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
</script>

<style lang="scss" scoped></style>
