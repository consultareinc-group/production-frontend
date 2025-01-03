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
        path: "compounding-mixing",
        name: "compounding-mixing",
        redirect: { name: "view-compounds-mixes" },
        children: [
          {
            path: "view",
            name: "view-compounds-mixes",
            component: () =>
              import("../pages/compounding-mixing/ViewCompoundsMixes.vue"),
          },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
