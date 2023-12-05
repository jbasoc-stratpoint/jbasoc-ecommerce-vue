const Module = () => import("./Module.vue");
const Home = () => import("./views/Home.vue");
const Product = () => import("./views/Product.vue");

export default [
  {
    path: "/products",
    name: "products_base",
    component: Module,
    children: [
      {
        path: "",
        name: "products",
        component: Home,
      },

      {
        path: ":id",
        name: "product",
        component: Product,
        props: true,
        beforeEnter: (to, from, next) => {
          console.log(from);
          console.log(Number.isInteger(Number(to.params.id)));
          if (Number.isInteger(Number(to.params.id))) {
            next();
          } else {
            console.log("test");
            return next("/notFound");
          }
        },
      },
    ],
  },
];
