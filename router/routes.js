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
        path: "yield-calculation",
        name: "yield-calculation",
        redirect: { name: "view-yield-calculations" },
        children: [
          {
            path: "view",
            name: "view-yield-calculations",
            component: () =>
              import("../pages/yield-calculation/ViewYieldCalculations.vue"),
          },
          {
            path: "view/:id",
            name: "view-yield-calculation-details",
            component: () =>
              import(
                "../pages/yield-calculation/ViewYieldCalculationDetails.vue"
              ),
          },
          {
            path: "add",
            name: "add-yield-calculation",
            component: () =>
              import("../pages/yield-calculation/AddYieldCalculation.vue"),
          },
          {
            path: "edit/:id",
            name: "edit-yield-calculation",
            component: () =>
              import("../pages/yield-calculation/EditYieldCalculation.vue"),
          },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
