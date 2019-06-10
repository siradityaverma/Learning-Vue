import Vue from "vue";
import VueProgressiveImage from "vue-progressive-image";
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";
import VueLodash from "vue-lodash";
import App from "./App.vue";

Vue.use(SuiVue);
Vue.use(VueProgressiveImage);
Vue.use(VueLodash);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
