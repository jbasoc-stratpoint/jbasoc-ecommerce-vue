import { createRouter, createWebHistory } from "vue-router";

// ADD ADDITIONAL MODULE ROUTES HERE
import productRoutes from "@/modules/products/router";
import authRoutes from "@/modules/auth/router";
import categoriesRoutes from "@/modules/categories/router";
import cartRoutes from "@/modules/cart/router";

const baseRoutes = [
  {
    path: "/",
    name: "default",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: () => import("@/views/PageNotFound.vue"),
  },
];

const routes = [
  ...baseRoutes,
  ...productRoutes,
  ...authRoutes,
  ...categoriesRoutes,
  ...cartRoutes,
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.onError((error) => {
  console.error("Router error:", error);
});

// Add auth Guards here if necessary
router.beforeEach((to, from, next) => {
  console.log(from);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("user")) {
      next("/user/login");
    } else next();
  } else {
    next();
  }
});

export default router;
