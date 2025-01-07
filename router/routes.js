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

      // Add your route here
    ],
  },
];
export default routes;
