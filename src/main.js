import Vue from "vue";
import VueResource from "vue-resource";
import VueClipboard from "vue-clipboard2";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueClipboard);

new Vue({
  render: h => h(App)
}).$mount("#app");
