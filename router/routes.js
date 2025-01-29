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
        path: "finished-goods",
        name: "finished-goods",
        redirect: { name: "view-finished-goods" },
        children: [
          {
            path: "view",
            name: "view-finished-goods",
            component: () =>
              import("../pages/finished-goods/ViewFinishedGoods.vue"),
          },
          {
            path: "view/:id",
            name: "view-finished-goods-details",
            component: () =>
              import("../pages/finished-goods/ViewFinishedGoodsDetails.vue"),
          },
          {
            path: "add",
            name: "add-finished-goods",
            component: () =>
              import("../pages/finished-goods/AddFinishedGoods.vue"),
          },
          {
            path: "edit/:id",
            name: "edit-finished-goods",
            component: () =>
              import("../pages/finished-goods/EditFinishedGoods.vue"),
          },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
