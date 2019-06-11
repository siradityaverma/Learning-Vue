import Vue from "vue";
import VueProgressiveImage from "vue-progressive-image";
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";
import VueRouter from "vue-router";

import router from "./router";

import App from "./App.vue";

Vue.use(SuiVue);
Vue.use(VueProgressiveImage);

Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
