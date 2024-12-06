import { ref } from "vue";

export function useAddProductionPlan() {
  const loading = ref(false);
  const addMaterialLoading = ref(false);
  const deleteMaterialLoading = ref(false);

  const productDetails = ref({
    batch_number: Date.now(),
    product_name: "",
    description: "",
    quantity: "",
    start_date_time: "",
    end_date_time: "",
    customer: "",
    purchase_order_number: "",
    sales_order_number: "",
    comment_notes: "",
  });

  const materialDetails = ref({
    id: Date.now(),
    material_name: "",
    description: "",
    uom: "",
    lot_number: "",
    amount: "",
    batch: "",
    amount_issued_date_time: "",
    pick_location: "",
    supplier_name: "",
  });

  const materials = ref([
    {
      id: Date.now(),
      material_name: "",
      description: "",
      uom: "",
      lot_number: "",
      amount: "",
      batch: "",
      amount_issued_date_time: "",
      pick_location: "",
      supplier_name: "",
    },
  ]);

  const addMaterial = () => {
    addMaterialLoading.value = true;
    setTimeout(() => {
      materials.value.push({
        id: Date.now(),
        material_name: "",
        description: "",
        uom: "",
        lot_number: "",
        amount: "",
        batch: "",
        amount_issued_date_time: "",
        pick_location: "",
        supplier_name: "",
      });
      addMaterialLoading.value = false;
    }, 1000);
  };

  const deleteMaterial = (id) => {
    materials.value = materials.value.filter((material) => material.id !== id);
  };

  const saveProductionPlan = () => {
    const productionPlan = {
      productDetails: productDetails.value,
      materials: materials.value,
    };
    console.log("Production Plan:", productionPlan);
  };

  return {
    loading,
    addMaterialLoading,
    deleteMaterialLoading,
    productDetails,
    materialDetails,
    materials,
    addMaterial,
    deleteMaterial,
    saveProductionPlan,
  };
}
