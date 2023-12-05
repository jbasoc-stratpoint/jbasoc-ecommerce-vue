const Module = () => import("./Module.vue");
const Home = () => import("./views/Home.vue");
const Checkout = () => import("./views/Checkout.vue");

export default [
  {
    path: "/cart",
    name: "cart_base",
    component: Module,
    children: [
      {
        path: "",
        name: "cart",
        component: Home,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "checkout",
        name: "checkout",
        component: Checkout,
        meta: {
          requiresAuth: true,
        },
        props: true,
      },
    ],
  },
];
