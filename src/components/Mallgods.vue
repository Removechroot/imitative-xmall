<template>
  <el-row class="good-item">
    <el-card :body-style="{ padding: 0 }">
      <div class="good-img">
        <a href="#">
          <img v-lazy="goods.productImageBig" alt="" />
        </a>
      </div>
      <h6 class="good-title">
        {{ goods.productName }}
      </h6>
      <h3 class="sub-title ellipsis">
        {{ goods.subTitle }}
      </h3>
      <div class="good-price pr">
        <div class="ds pa">
          <a href="javascript:;">
            <el-button
              type="default"
              size="mediun"
              @click="gotoDetail(goods.productId)"
              >查看詳情</el-button
            >
          </a>
          <a href="javascript:;">
            <el-button
              type="default"
              size="mediun"
              @click="
                addCart(
                  goods.productId,
                  goods.salePrice,
                  goods.productName,
                  goods.productImageBig
                )
              "
              >加入购物车</el-button
            >
          </a>
        </div>
        <p>
          <span style="font-size:14px">￥</span>
          {{ Number(goods.salePrice).toFixed(2) }}
        </p>
      </div>
    </el-card>
  </el-row>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { getStore } from "@/utils/storage";
export default {
  computed: {
    ...mapState(["login"]),
  },
  props: ["goods"],
  methods: {
    ...mapMutations(['ADDCART']),
    gotoDetail(id) {
      this.$router.push({
        path: "goodsDetails?productId=" + id,
      });
    },
    // 购物车逻辑重点
    addCart(id, price, name, img) {
      console.log(id,price,name,img);
      if (this.login) {
        // 判断用户是否登录
         this.$http.post("/api/addCart", {
          userId: getStore("id"),
          productID: id,
          productNum: 1,
        });
        // 已经存储到后端中，将当前的商品存储到store的caetlist中
        this.ADDCART({
          productId:id,
          salePrice:price,
          productName:name,
          priductimg:img
        })
        //否则
      }else{
                this.ADDCART({
          productId:id,
          salePrice:price,
          productName:name,
          priductimg:img
        })
      }

      
    },
  },
};
</script>

<style lang="scss" scoped>
.good-img {
  display: flex;
  justify-content: center;
  a {
    display: block;
    img {
      margin: 50px auto 10px;
      width: 206px;
      height: 206px;
      display: block;
    }
  }
}
.good-price {
  margin: 15px 0;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #d44d44;
  font-family: Arial;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: space-around;
  padding-bottom: 60px;
  a {
    margin-right: 5px;
  }
  .ds {
    display: none;
  }
}
.good-price:hover .ds {
  display: block;
}
.good-title {
  line-height: 1.2;
  font-size: 16px;
  color: #424242;
  margin: 0 auto;
  padding: 0 14px;
  text-align: center;
  overflow: hidden;
}
h3 {
  text-align: center;
  line-height: 1.2;
  font-size: 12px;
  color: #d0d0d0;
  padding: 10px;
}
.good-item {
  background: #fff;
  width: 25%;
  transition: all 0.5s;
  height: 410px;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 1px 1px 20px #999;
    .good-price p {
      display: none;
    }
    .ds {
      display: flex;
    }
  }
}
.el-card {
  border: none;
}
</style>
