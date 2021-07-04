import Vue from "vue";
import App from "./App.vue";
import FirebaseVue from "./assets/firebase/index";
import "./assets/SCSS/app.scss";

Vue.use(FirebaseVue);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
