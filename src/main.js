import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)


Vue.config.productionTip = false
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Vue.prototype.$http = window.axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
