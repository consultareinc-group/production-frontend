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
        path: "post-production-verification",
        name: "post-production-verification",
        redirect: { name: "view-post-production-verification" },
        children: [
          {
            path: "view",
            name: "view-post-production-verification",
            component: () =>
              import(
                "../pages/post-production-verification/ViewPostProductionVerification.vue"
              ),
          },
          {
            path: "view/:id",
            name: "view-post-production-verification-details",
            component: () =>
              import(
                "../pages/post-production-verification/ViewPostProductionVerificationDetails.vue"
              ),
          },
          // {
          //   path: "add",
          //   name: "add-weigh-out",
          //   component: () => import("../pages/weigh-out/AddWeighOut.vue"),
          // },
          // {
          //   path: "edit/:id",
          //   name: "edit-weigh-out",
          //   component: () => import("../pages/weigh-out/EditWeighOut.vue"),
          // },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
