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
        path: "scrap-material-reports",
        name: "scrap-material-reports",
        redirect: { name: "view-scrap-material-reports" },
        children: [
          {
            path: "view",
            name: "view-scrap-material-reports",
            component: () =>
              import(
                "../pages/scrap-material-report/ViewScrapMaterialReports.vue"
              ),
          },
          {
            path: "view/:id",
            name: "view-scrap-material-report-details",
            component: () =>
              import(
                "../pages/scrap-material-report/ViewScrapMaterialReportDetails.vue"
              ),
          },
          // {
          //   path: "add",
          //   name: "add-finished-goods",
          //   component: () =>
          //     import("../pages/finished-goods/AddFinishedGoods.vue"),
          // },
          // {
          //   path: "edit/:id",
          //   name: "edit-finished-goods",
          //   component: () =>
          //     import("../pages/finished-goods/EditFinishedGoods.vue"),
          // },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
