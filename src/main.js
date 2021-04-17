import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import axios from 'axios';
import api from './api/index';
import store from './store';

import VueAMap from "vue-amap";

Vue.prototype.$myAxios = axios;
Vue.prototype.$api = api

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: "95fa72137f4263f8e64ae01f766ad09c",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.Geocoder"
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.4"
});

Vue.use(Antd);
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
