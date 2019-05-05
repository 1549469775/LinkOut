import Vue from "vue"
import App from "./App.vue"

import "normalize.css"
import store from './store/index.js'
import router from './routes/index.js'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */ );

Vue.config.productionTip = false

window && (window.alert = new(function () {
  this.show = function (text) {
    vm.$store.dispatch("alert/show", text);
  }
  this.hide = function () {
    vm.$store.dispatch("alert/hide");
  }
}));


var vm = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")