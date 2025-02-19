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
        path: "production-planning",
        name: "production-planning",
        redirect: { name: "view-production-plans" },
        children: [
          {
            path: "view",
            name: "view-production-plans",
            component: () =>
              import("../pages/planning/ViewProductionPlans.vue"),
          },
          {
            path: "view/:id",
            name: "view-production-plan-details",
            component: () =>
              import("../pages/planning/ViewProductionPlanDetails.vue"),
          },
          {
            path: "add",
            name: "add-production-plan",
            component: () => import("../pages/planning/AddProductionPlan.vue"),
          },
          {
            path: "edit/:id",
            name: "edit-production-plan",
            component: () => import("../pages/planning/EditProductionPlan.vue"),
          },
        ],
      },
      {
        path: "pre-operations-verification",
        name: "pre-operations-verification",
        redirect: { name: "view-pre-operations-verification" },
        children: [
          {
            path: "view",
            name: "view-pre-operations-verification",
            component: () =>
              import(
                "../pages/pre-operations-verification/ViewPreOperationsVerification.vue"
              ),
          },
          {
            path: "view/:id",
            name: "view-pre-operations-verification-details",
            component: () =>
              import(
                "../pages/pre-operations-verification/ViewPreOperationsVerificationDetails.vue"
              ),
          },
          {
            path: "add",
            name: "add-pre-operations-verification",
            component: () =>
              import(
                "../pages/pre-operations-verification/AddPreOperationsVerification.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-pre-operations-verification",
            component: () =>
              import(
                "../pages/pre-operations-verification/EditPreOperationsVerification.vue"
              ),
          },
        ],
      },
      {
        path: "compounding-mixing",
        name: "compounding-mixing",
        redirect: { name: "view-compounds-mixes" },
        children: [
          {
            path: "view",
            name: "view-compounds-mixes",
            component: () =>
              import("../pages/compounding-mixing/ViewCompoundsMixes.vue"),
          },
          {
            path: "view:id",
            name: "view-compound-mix-details",
            component: () =>
              import("../pages/compounding-mixing/ViewCompoundMixDetails.vue"),
          },
          {
            path: "add",
            name: "add-compound-mix",
            component: () =>
              import("../pages/compounding-mixing/AddCompoundMix.vue"),
          },
          {
            path: "edit/:id",
            name: "edit-compound-mix",
            component: () =>
              import("../pages/compounding-mixing/EditCompoundMix.vue"),
          },
        ],
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
          {
            path: "edit/:id",
            name: "edit-equipment",
            component: () => import("../pages/equipment/EditEquipment.vue"),
          },
        ],
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
          {
            path: "view/:id",
            name: "view-weigh-out-details",
            component: () =>
              import("../pages/weigh-out/ViewWeighOutDetails.vue"),
          },
          {
            path: "add",
            name: "add-weigh-out",
            component: () => import("../pages/weigh-out/AddWeighOut.vue"),
          },
          {
            path: "edit/:id",
            name: "edit-weigh-out",
            component: () => import("../pages/weigh-out/EditWeighOut.vue"),
          },
        ],
      },
      {
        path: "label-and-carton-reconcillation",
        name: "label-and-carton-reconcillation",
        redirect: { name: "view-label-and-carton-reconcillation" },
        children: [
          {
            path: "view",
            name: "view-label-and-carton-reconcillation",
            component: () =>
              import(
                "../pages/label-and-carton-reconcillation/ViewLabelAndCartonReconcillation.vue"
              ),
          },
          {
            path: "view/:id",
            name: "view-label-and-carton-reconcillation-details",
            component: () =>
              import(
                "../pages/label-and-carton-reconcillation/ViewLabelAndCartonReconcillationDetails.vue"
              ),
          },
          {
            path: "add",
            name: "add-label-and-carton-reconcillation",
            component: () =>
              import(
                "../pages/label-and-carton-reconcillation/AddLabelAndCartonReconcillation.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-label-and-carton-reconcillation",
            component: () =>
              import(
                "../pages/label-and-carton-reconcillation/EditLabelAndCartonReconcillation.vue"
              ),
          },
        ],
      },
      {
        path: "packaging-material-trace",
        name: "packaging-material-trace",
        redirect: { name: "view-packaging-material-traces" },
        children: [
          {
            path: "view",
            name: "view-packaging-material-traces",
            component: () =>
              import(
                "../pages/packaging-material-trace/ViewPackagingMaterialTraces.vue"
              ),
          },
          {
            path: "view/:id",
            name: "view-packaging-material-traces-details",
            component: () =>
              import(
                "../pages/packaging-material-trace/ViewPackagingMaterialTracesDetails.vue"
              ),
          },
          {
            path: "add",
            name: "add-packaging-material-trace",
            component: () =>
              import(
                "../pages/packaging-material-trace/AddPackagingMaterialTrace.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-packaging-material-trace",
            component: () =>
              import(
                "../pages/packaging-material-trace/EditPackagingMaterialTrace.vue"
              ),
          },
        ],
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
