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
        name: "Pre-Operations Verification",
        redirect: { name: "viewPreOperationsVerification" },
        children: [
          {
            path: "view",
            name: "viewPreOperationsVerification",
            component: () =>
              import(
                "../pages/pre-operations-verification/ViewPreOperationsVerification.vue"
              ),
          },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
