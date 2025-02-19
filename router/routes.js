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
          {
            path: "view/:id",
            name: "view-label-and-carton-reconcillation-details",
            component: () =>
              import(
                "../pages/label-and-carton-reconcillation/ViewLabelAndCartonReconcillationDetails.vue"
              ),
          },
          {
            path: "add",
            name: "add-label-and-carton-reconcillation",
            component: () =>
              import(
                "../pages/label-and-carton-reconcillation/AddLabelAndCartonReconcillation.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-label-and-carton-reconcillation",
            component: () =>
              import(
                "../pages/label-and-carton-reconcillation/EditLabelAndCartonReconcillation.vue"
              ),
          },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
