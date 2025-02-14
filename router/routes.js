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
        path: "rework-reprocess",
        name: "rework-reprocess",
        redirect: { name: "view-rework-reprocess" },
        children: [
          {
            path: "view",
            name: "view-rework-reprocess",
            component: () =>
              import("../pages/rework-reprocess/ViewReworkReprocess.vue"),
          },
          {
            path: "view/:id",
            name: "view-rework-reprocess-details",
            component: () =>
              import(
                "../pages/rework-reprocess/ViewReworkReprocessDetails.vue"
              ),
          },
          // {
          //   path: "add",
          //   name: "add-scrap-material-report",
          //   component: () =>
          //     import(
          //       "../pages/scrap-material-report/AddScrapMaterialReport.vue"
          //     ),
          // },
          // {
          //   path: "edit/:id",
          //   name: "edit-scrap-material-report",
          //   component: () =>
          //     import(
          //       "../pages/scrap-material-report/EditScrapMaterialReport.vue"
          //     ),
          // },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
