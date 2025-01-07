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
        ],
      },

      // Add your route here
    ],
  },
];
export default routes;
