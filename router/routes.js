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
          {
            path: "view:id",
            name: "view-compound-mix-details",
            component: () =>
              import("../pages/compounding-mixing/ViewCompoundMixDetails.vue"),
          },
          {
            path: "add",
            name: "add-compound-mix",
            component: () =>
              import("../pages/compounding-mixing/AddCompoundMix.vue"),
          },
          {
            path: "edit/:id",
            name: "edit-compound-mix",
            component: () =>
              import("../pages/compounding-mixing/EditCompoundMix.vue"),
          },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
