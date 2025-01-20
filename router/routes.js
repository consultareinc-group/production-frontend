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
        path: "label-and-carton-reconcillation",
        name: "label-and-carton-reconcillation",
        redirect: { name: "view-label-and-carton-reconcillation" },
        children: [
          {
            path: "view",
            name: "view-label-and-carton-reconcillation",
            component: () =>
              import(
                "../pages/label-and-carton-reconcillation/ViewLabelAndCartonReconcillation.vue"
              ),
          },
          // {
          //   path: "view/:id",
          //   name: "view-weigh-out-details",
          //   component: () =>
          //     import("../pages/weigh-out/ViewWeighOutDetails.vue"),
          // },
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
