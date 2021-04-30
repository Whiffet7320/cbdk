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
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
// import  '@supermap/vue-iclient3d-webgl/dist/styles/vue-iclient3d-webgl.min.css';
// import VueiClient from '@supermap/vue-iclient3d-webgl';
// Vue.use(VueiClient);

// Vue.prototype.$Supermap = VueiClient

Vue.prototype.$myAxios = axios;
Vue.prototype.$api = api


Vue.use(Antd);
Vue.use(ElementUI);
Vue.use(VXETable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
