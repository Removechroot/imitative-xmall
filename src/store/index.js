import Vue from "vue";
import Vuex from "vuex";
import { setStore,getStore } from "@/utils/storage";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    userInfo: null,
    cartlist: [],
    showCart: false,
    test: "asd",
  },
  mutations: {
    INITBUYCART(state){
      let initCart = getStore('buyCart')
      if(initCart){
        state.cartlist = JSON.parse(initCart)
      }
    },
    SHOWCART(state, { showCard }) {
      state.showCart = showCard;
    },
    ISLOGIN(state, info) {
      state.userInfo = info;
      state.login = true;
      setStore("userInfo", info);
    },
    ADDCART(
      state,
      { productId, salePrice, productName, priductimg, productNum = 1 }
    ) {
      var cart = state.cartlist;
      var goods = {
        productId,
        salePrice,
        productName,
        priductimg,
      };
      var flag = true;

      if (cart.length) {
        for (let item of cart) {
          if (item.productId === productId) {
            if (item.productNum >= 0) {
              flag = false;
              item.productNum += productNum;
            }
          }
        }
      }

      // if (cart.length) {
      //   cart.forEach((item) => {
      //     if (item.productId === productId) {
      //       if (item.productNum >= 0) {
      //         flag = false;
      //         item.productNum += productNum;
      //       }
      //     }
      //   });
      // }
      if (!cart.length || flag) {
        goods.productNum = productNum;
        cart.push(goods);
      }
      state.cartlist = cart;
      setStore("buyCart", cart);
    },
  },
  actions: {},
  modules: {},
});
