import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import store from "./store";
import FirebaseVue from "./assets/firebase/index";
import "./assets/SCSS/app.scss";

Vue.use(FirebaseVue);
Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App)
}).$mount("#app");
