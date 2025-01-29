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
        path: "label-trace",
        name: "label-trace",
        redirect: { name: "view-label-traces" },
        children: [
          {
            path: "view",
            name: "view-label-traces",
            component: () => import("../pages/label-trace/ViewLabelTraces.vue"),
          },
          {
            path: "view/:id",
            name: "view-label-trace-details",
            component: () =>
              import("../pages/label-trace/ViewLabelTraceDetails.vue"),
          },
          {
            path: "add",
            name: "add-label-trace",
            component: () => import("../pages/label-trace/AddLabelTrace.vue"),
          },
          {
            path: "edit/:id",
            name: "edit-label-trace",
            component: () => import("../pages/label-trace/EditLabelTrace.vue"),
          },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
