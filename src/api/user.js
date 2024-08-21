import request from '@/utils/request.js'
// 用户注册
export const userRegister = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })
export const userLogin = ({ username, password }) =>
  request.post('/api/login', { username, password })
