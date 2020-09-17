import Vue from 'vue'
import VueRouter from 'vue-router'


const Index = ()=> import ('@/views/index')
const Login = ()=> import ('@/views/login/index')
const Home = ()=> import ('@/views/home/index')
const Goods = ()=> import ('@/views/Goods/goods')
const Thanks = ()=> import ('@/views/Thanks/Thanks')
const GoodsDetails = ()=> import ('@/views/GoodsDetails')
const User = ()=> import ('@/views/User')

// import Index from '@/views/index';
// import Login from '@/views/login/index';
// import Home from '@/views/home/index';
// import Goods from '@/views/Goods/goods';
// import Thanks from '@/views/Thanks/Thanks';
// import GoodsDetails from '@/views/GoodsDetails';
// import User from '@/views/User'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect:'/home',
    component: Index,
    children:[
      {
        path:'home',
        component:Home
      },
      {
        path:'goods',
        component:Goods
      },
      {
        path:'thanks',
        component:Thanks
      },
      {
        path:'goodsDetails',
        name:'goodsDetails',
        component:GoodsDetails
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta:{
      auth:true
    }
  }
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
