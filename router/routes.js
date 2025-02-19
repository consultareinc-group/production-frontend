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
        path: "production-planning",
        name: "production-planning",
        redirect: { name: "view-production-plans" },
        children: [
          {
            path: "view",
            name: "view-production-plans",
            component: () =>
              import("../pages/planning/ViewProductionPlans.vue"),
          },
          {
            path: "view/:id",
            name: "view-production-plan-details",
            component: () =>
              import("../pages/planning/ViewProductionPlanDetails.vue"),
          },
          {
            path: "add",
            name: "add-production-plan",
            component: () => import("../pages/planning/AddProductionPlan.vue"),
          },
          {
            path: "edit/:id",
            name: "edit-production-plan",
            component: () => import("../pages/planning/EditProductionPlan.vue"),
          },
        ],
      },
      {
        path: "pre-operations-verification",
        name: "pre-operations-verification",
        redirect: { name: "view-pre-operations-verification" },
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
          {
            path: "edit/:id",
            name: "edit-pre-operations-verification",
            component: () =>
              import(
                "../pages/pre-operations-verification/EditPreOperationsVerification.vue"
              ),
          },
        ],
      },
      // Add your route here
    ],
  },
];
export default routes;
