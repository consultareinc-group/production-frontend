import { ref } from "vue";

export const columns = ref([
  {
    name: "action",
    required: true,
    label: "Action",
    align: "left",
    field: (row) => row.action,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "personnel",
    required: true,
    label: "Personnel",
    align: "left",
    field: (row) => row.personnel,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date_time",
    required: true,
    label: "Date & Time",
    align: "left",
    field: (row) => row.date_time,
    format: (val) => `${val}`,
    sortable: true,
  },
]);

export const originalRows = ref([
  {
    action: "Performed",
    personnel: "Ethan Blake",
    date_time: "August 10, 2024 8:00 AM",
  },
]);
