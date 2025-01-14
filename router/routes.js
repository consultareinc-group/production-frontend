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
        path: "weigh-out",
        name: "weigh-out",
        redirect: { name: "view-weigh-out" },
        children: [
          {
            path: "view",
            name: "view-weigh-out",
            component: () => import("../pages/weigh-out/ViewWeighOut.vue"),
          },
          // {
          //   path: "view/:id",
          //   name: "view-equipment-details",
          //   component: () =>
          //     import("../pages/equipment/ViewEquipmentDetails.vue"),
          // },
          // {
          //   path: "add",
          //   name: "add-equipment",
          //   component: () => import("../pages/equipment/AddEquipment.vue"),
          // },
          // {
          //   path: "edit/:id",
          //   name: "edit-equipment",
          //   component: () => import("../pages/equipment/EditEquipment.vue"),
          // },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
