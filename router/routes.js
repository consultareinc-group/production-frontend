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
        name: "pre-operation-verification",
        redirect: { name: "view-pre-operation-verification" },
        children: [
          {
            path: "view",
            name: "view-pre-operation-verification",
            component: () =>
              import(
                "../pages/pre-operations-verification/ViewPreOperationsVerification.vue"
              ),
          },
          {
            path: "view/:id",
            name: "view-pre-operation-verification-details",
            component: () =>
              import(
                "../pages/pre-operations-verification/ViewPreOperationsVerificationDetails.vue"
              ),
          },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
