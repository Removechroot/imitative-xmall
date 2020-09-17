import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import axios from "axios";
import { getStore } from "@/utils/storage";

import Vuelazyload from "vue-lazyload";

Vue.use(Vuelazyload);
Vue.use(Vuelazyload, {
  preLoad: 1.3,
  error: "static/images/error.png",
  loading: "static/images/load.gif",
  attempt: 1,
});
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
axios.defaults.baseURL = "http://servers.ngrok2.xiaomiqiu.cn";
axios.interceptors.request.use((config) => {
  const token = getStore("token");
  if (token) {
    // 已登录
    config.headers.common["Authorization"] = token;
  }
  return config;
}),
  (error) => {
    return Promise.reject(error);
  };
// 守卫
router.beforeEach((to, from, next) => {
  axios
    .post("/api/validate", {})
    .then((res) => {
      let data = res.data;
      if (data.state != 1) {
        const isok = to.matched.some((item) => {
          return item.meta.auth;
        });
        if (isok) {
          next({
            name: "login",
            // path: "/login",
            // query: {
            //   redirect: to.fullPath,
            // },
          });
        } else {
          next();
        }
      } else {
        store.commit("ISLOGIN", data);
        if (to.path === "/login") {
          router.push({
            path: "/",
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
