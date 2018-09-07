/**
* Created by aresn on 16/6/20.
*/
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import ChatBox from '../index';
import "../src/styles/layout.less";

Vue.use(VueRouter);
Vue.use(ChatBox);

// 生成提示信息
Vue.config.productionTip = false;

// 路由配置
const router = new VueRouter({
  routes: [
    {
      path: '/chat-box',
      component: () => import('./components/ChatBox.vue')
    }
  ]
});

export default new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});