<template>
  <div>
    <input v-model="userName"/>
    <button @click="login">
      登陆
    </button>
  </div>
</template>

<script>
import $api from '../services/config'

export default {
  name: 'CmmLogin',
  data() {
    return {
      userName: '',
    }
  },
  methods: {
    login() {
      $api.login({
        userName: this.userName
      })
        .then(res => {
          if (res && res.data) {
            localStorage.setItem('token', res.data.token)
            this.setCookie('test2', 'test~~~', 60 * 60 * 1000, 'test2.cuimm.com', '/')
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    setCookie(name, value, expiration, domain, path = '/') {
      let data = `${name}=${value};`
      if (expiration) {
        data += `expires=${new Date(Date.now() + expiration)};`
      }
      path && (data += `path=${path};`)
      domain && (data += `domain=${domain}`)
      document.cookie = data
    },
  },
}
</script>
