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
        path: "pre-operations-verification",
        name: "pre-operations-verification",
        redirect: { name: "view-pre-operation-verification" },
        children: [
          {
            path: "view",
            name: "view-pre-operations-verification",
            component: () =>
              import(
                "../pages/pre-operations-verification/ViewPreOperationsVerification.vue"
              ),
          },
          {
            path: "view/:id",
            name: "view-pre-operations-verification-details",
            component: () =>
              import(
                "../pages/pre-operations-verification/ViewPreOperationsVerificationDetails.vue"
              ),
          },
          {
            path: "add",
            name: "add-pre-operations-verification",
            component: () =>
              import(
                "../pages/pre-operations-verification/AddPreOperationsVerification.vue"
              ),
          },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
