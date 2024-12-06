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
        path: "planning/view-production-plans",
        name: "viewProductionPlans",
        component: () => import("../pages/planning/ViewProductionPlans.vue"),
      },
      {
        path: "planning/view-production-plans/:id",
        name: "viewProductionPlanDetails",
        component: () =>
          import("../pages/planning/ViewProductionPlanDetails.vue"),
      },

      // Add your route here
    ],
  },
];
export default routes;
