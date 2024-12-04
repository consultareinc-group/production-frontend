const routes = [
  {
    path: "/production",
    name: "Production Management System",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../pages/IndexPage.vue"),
      },
      {
        path: "planning",
        name: "planning",
        component: () => import("../pages/PlanningPage.vue"),
      },

      // Add your route here
    ],
  },
];
export default routes;
