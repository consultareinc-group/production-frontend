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
        path: "planning",
        name: "planning",
        redirect: { name: "view-production-plans" },
        children: [
          {
            path: "view-production-plans",
            name: "view-production-plans",
            component: () =>
              import("../pages/planning/ViewProductionPlans.vue"),
          },
          {
            path: "view-production-plans/:id",
            name: "view-production-plan-details",
            component: () =>
              import("../pages/planning/ViewProductionPlanDetails.vue"),
          },
          {
            path: "add-production-plan",
            name: "add-production-plan",
            component: () => import("../pages/planning/AddProductionPlan.vue"),
          },
          {
            path: "edit-production-plan/:id",
            name: "edit-production-plan",
            component: () => import("../pages/planning/EditProductionPlan.vue"),
          },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
