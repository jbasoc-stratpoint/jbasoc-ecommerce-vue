const Module = () => import("./Module.vue");
const Login = () => import("./views/Login.vue");
const Profile = () => import("./views/Profile.vue");

export default [
  {
    path: "/user",
    component: Module,
    children: [
      {
        path: "login",
        name: "login",
        component: Login,
        beforeEnter: (to, from, next) => {
          console.log(to);
          console.log(from);
          if (
            localStorage.getItem("token") != null &&
            localStorage.getItem("user") != null
          ) {
            next({
              name: "default",
            });
          } else next();
        },
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];
