import { createRouter, createWebHistory } from "@ionic/vue-router";
import Tabs from "../views/Tabs.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/",
      },
      {
        path: "home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "communes",
        component: () => import("@/views/Town.vue"),
      },
      {
        path: "departements",
        component: () => import("@/views/Department.vue"),
      },
      {
        path: "regions",
        component: () => import("@/views/Region.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
