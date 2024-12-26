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
        name: "Planning",
        redirect: { name: "viewProductionPlans" },
        children: [
          {
            path: "view-production-plans",
            name: "viewProductionPlans",
            component: () =>
              import("../pages/planning/ViewProductionPlans.vue"),
          },
          {
            path: "view-production-plans/:id",
            name: "viewProductionPlanDetails",
            component: () =>
              import("../pages/planning/ViewProductionPlanDetails.vue"),
          },
          {
            path: "add-production-plan",
            name: "addProductionPlan",
            component: () => import("../pages/planning/AddProductionPlan.vue"),
          },
          {
            path: "edit-production-plan/:id",
            name: "editProductionPlan",
            component: () => import("../pages/planning/EditProductionPlan.vue"),
          },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
