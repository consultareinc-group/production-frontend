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
        path: "label-trace",
        name: "label-trace",
        redirect: { name: "view-label-traces" },
        children: [
          {
            path: "view",
            name: "view-label-traces",
            component: () => import("../pages/label-trace/ViewLabelTraces.vue"),
          },
          // {
          //   path: "view/:id",
          //   name: "view-label-and-carton-reconcillation-details",
          //   component: () =>
          //     import(
          //       "../pages/label-and-carton-reconcillation/ViewLabelAndCartonReconcillationDetails.vue"
          //     ),
          // },
          // {
          //   path: "add",
          //   name: "add-label-and-carton-reconcillation",
          //   component: () =>
          //     import(
          //       "../pages/label-and-carton-reconcillation/AddLabelAndCartonReconcillation.vue"
          //     ),
          // },
          // {
          //   path: "edit/:id",
          //   name: "edit-label-and-carton-reconcillation",
          //   component: () =>
          //     import(
          //       "../pages/label-and-carton-reconcillation/EditLabelAndCartonReconcillation.vue"
          //     ),
          // },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
