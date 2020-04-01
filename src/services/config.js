import http from './api'

export default {
  login: (params) => http.$api.post('./api/login', params),
  getUserInfo: () => http.$api.get('/api/getUserInfo'),
}
