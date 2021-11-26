import FirebaseAuth from "@/data/services/firebase-auth";
import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/ui/views/Home.vue"),
  },
  {
    path: "/cronograma",
    name: "Schedule",
    component: () =>
      import(/* webpackChunkName: "schedule" */ "@/ui/views/Home.vue"),
  },
  {
    path: "/transmision",
    name: "Stream",
    component: () =>
      import(/* webpackChunkName: "stream" */ "@/ui/views/Stream.vue"),
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

// Authorization middleware
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (to.name?.toString() != "Home") {
      try {
        const loggedIn = FirebaseAuth.checkAuth();
        if (loggedIn) {
          next();
        } else {
          next({ name: "Home" });
        }
      } catch (error) {
        next({ name: "Home" });
      }
    } else {
      next();
    }
  }
);

export default router;
