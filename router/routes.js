const routes = [
  {
    path: "/production",

    component: () => import("./layouts/MainLayout.vue"),
    children: [
      { path: "", name: "Home", component: () => import("pages/IndexPage.vue") },
      { path: "nav1", name: "Nav1", component: () => import("pages/IndexPage.vue") },
      { path: "nav2", name: "Nav2", component: () => import("pages/IndexPage.vue") },
      { path: "nav3", name: "Nav3", component: () => import("pages/IndexPage.vue") },
    ],
  },
  {
    path: "/elements",
    component: () => import("pages/ElementPage.vue")
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
