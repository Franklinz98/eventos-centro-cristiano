import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/cronograma",
    name: "Schedule",
    component: () =>
      import(/* webpackChunkName: "schedule" */ "../views/Home.vue"),
  },
  {
    path: "/transmision",
    name: "Stream",
    component: () =>
      import(/* webpackChunkName: "stream" */ "../views/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        top: 0,
        behavior: "smooth",
      };
    }
  },
});

export default router;
