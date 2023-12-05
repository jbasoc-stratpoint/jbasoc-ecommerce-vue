const Module = () => import("./Module.vue");
//const Home = () => import("./views/Home.vue");

export default [
  {
    path: "/base_template",
    component: Module,
    /*
    children: [
      {
        path: "",
        component: Home,
      },
    ],
    */
  },
];
