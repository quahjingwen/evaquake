import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetify from 'vuetify';
import Vuesax from 'vuesax'
import VueCharts from "vue-charts";
import VueChartkick from "vue-chartkick";
import Highcharts from "highcharts";
import VueResource from "vue-resource";



import 'vuesax/dist/vuesax.css' //Vuesax styles
import * as VueFire from "vuefire";
import BootstrapVue from 'bootstrap-vue'



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'

//import Firebase from "firebase";

Vue.config.productionTip = false;
Vue.config.devtools = true

Vue.use(Vuesax)
Vue.use(VueFire);
Vue.use(router);
Vue.use(Vuetify);
Vue.use(VueChartkick, { adapter: Highcharts });
Vue.use(VueResource);
// Vue.use(VueRouter);
Vue.use(VueCharts);
// Vue.use(Chart);
Vue.use(BootstrapVue)

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App },
  render: h => h(App)
}).$mount("#app");
