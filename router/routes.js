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
        path: "processing",
        name: "processing",
        redirect: { name: "view-processes" },
        children: [
          {
            path: "view",
            name: "view-processes",
            component: () => import("../pages/processing/ViewProcesses.vue"),
          },
          {
            path: "view/:id",
            name: "view-process-details",
            component: () =>
              import("../pages/processing/ViewProcessDetails.vue"),
          },
          {
            path: "add",
            name: "add-process",
            component: () => import("../pages/processing/AddProcess.vue"),
          },
          {
            path: "edit/:id",
            name: "edit-process",
            component: () => import("../pages/processing/EditProcess.vue"),
          },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
