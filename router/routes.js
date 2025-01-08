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
        path: "equipment",
        name: "equipment",
        redirect: { name: "view-equipments" },
        children: [
          {
            path: "view",
            name: "view-equipments",
            component: () => import("../pages/equipment/ViewEquipments.vue"),
          },
          {
            path: "view/:id",
            name: "view-equipment-details",
            component: () =>
              import("../pages/equipment/ViewEquipmentDetails.vue"),
          },
          {
            path: "add",
            name: "add-equipment",
            component: () => import("../pages/equipment/AddEquipment.vue"),
          },
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
