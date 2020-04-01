<template>
  <div class="cmm-profile__panel">
    profile
    {{userInfo}}
  </div>
</template>
<script>
import $api from '../services/config'

export default {
  name: 'CmmProfile',
  data() {
    return {
      userInfo: {},
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      this.userInfo = await $api.getUserInfo()
    },
  },
}
</script>
