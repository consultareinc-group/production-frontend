const routes = [
  {
    path: "/production",
    name: "Production Management System",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      { path: "", name: "Home", component: () => import("../pages/IndexPage.vue") },
      { path: "menu-item", name: "menu-item", component: () => import("../pages/IndexPage.vue") },
      // Add your route here
    ],
  },
];
export default routes;
