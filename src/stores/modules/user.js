import { defineStore } from 'pinia'
import { ref } from 'vue'
//token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (value) => {
      token.value = value
    }
    const removeToken = () => {
      token.value = ''
    }
    return { token, setToken, removeToken }
  },
  { persist: true }
)
