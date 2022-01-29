import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Create from '../src/components/Create.vue'
import Edit from '../src/components/Edit'
import Home from '../src/components/Home.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
Vue.config.productionTip = false
Vue.use(VueRouter)
const routes = [
  {
    name: 'Create',
    path: '/create',
    component: Create
  },
  {
    name: 'Edit',
    path: '/edit',
    component: Edit
  },
  {
    name: 'Home',
    path: '/home',
    component: Home
  },
  {
    name: 'Home',
    path: '/',
    redirect: '/home',
    component: Home
  },
];

const router = new VueRouter({ mode: 'history', routes: routes });

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

