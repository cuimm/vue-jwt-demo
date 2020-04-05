import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// runtime 方式：官方不建议，打包后文件比上面render方式大
// 如果用该方式初始化vue实例，需配置 vue.config.js： runtimeCompiler: true
/*
new Vue({
  router,
  store,
  components: {
    App,
  },
  template: '<App />'
}).$mount('#app');
*/
