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
        path: "packaging-material-trace",
        name: "packaging-material-trace",
        redirect: { name: "view-packaging-material-traces" },
        children: [
          {
            path: "view",
            name: "view-packaging-material-traces",
            component: () =>
              import(
                "../pages/packaging-material-trace/ViewPackagingMaterialTraces.vue"
              ),
          },
          {
            path: "view/:id",
            name: "view-packaging-material-traces-details",
            component: () =>
              import(
                "../pages/packaging-material-trace/ViewPackagingMaterialTracesDetails.vue"
              ),
          },
          // {
          //   path: "add",
          //   name: "add-weigh-out",
          //   component: () => import("../pages/weigh-out/AddWeighOut.vue"),
          // },
          // {
          //   path: "edit/:id",
          //   name: "edit-weigh-out",
          //   component: () => import("../pages/weigh-out/EditWeighOut.vue"),
          // },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
