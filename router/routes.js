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
        path: "processing",
        name: "processing",
        redirect: { name: "view-processes" },
        children: [
          {
            path: "view",
            name: "view-processes",
            component: () => import("../pages/processing/ViewProcesses.vue"),
          },
          {
            path: "view/:id",
            name: "view-process-details",
            component: () =>
              import("../pages/processing/ViewProcessDetails.vue"),
          },
          // {
          //   path: "add",
          //   name: "add-pre-operations-verification",
          //   component: () =>
          //     import(
          //       "../pages/pre-operations-verification/AddPreOperationsVerification.vue"
          //     ),
          // },
          // {
          //   path: "edit/:id",
          //   name: "edit-pre-operations-verification",
          //   component: () =>
          //     import(
          //       "../pages/pre-operations-verification/EditPreOperationsVerification.vue"
          //     ),
          // },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
