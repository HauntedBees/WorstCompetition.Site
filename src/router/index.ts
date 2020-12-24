import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
Vue.use(VueRouter)
const routes: Array<RouteConfig> = [
  { path: "/", name: "Home", component: Home },
  { path: "/users/:id", name: "User", component: User }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;