import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect:"home"
      component: () => import("../components/Home.vue")
    },
    {
      name: "create",
      path: "/create",
      component: () => import("../components/Create.vue")
    },
    {
      name: "edit",
      path: "/edit",
      component: () => import("../components/Edit.vue")
    },
  ]
});
