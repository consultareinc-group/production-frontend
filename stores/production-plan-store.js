import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useProductionPlanStore = defineStore("production-plan", {
  state: () => ({}),
  actions: {
    GetProductionPlans(request) {
      return new Promise((resolve, reject) => {
        api
          .get(
            `cig-production/production-plan/production-planning?offset=${request.offset}`
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },

    GetProductionPlan(id) {
      return new Promise((resolve, reject) => {
        api
          .get(`cig-production/production-plan/production-planning/${id}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },

    SearchProductionPlans(request) {
      return new Promise((resolve, reject) => {
        api
          .get(
            `cig-production/production-plan/production-planning?search_keyword=${request.keyword}`
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },

    ArchiveProductionPlan(request) {
      return new Promise((resolve, reject) => {
        api
          .put(
            `cig-production/production-plan/production-planning/archive/${request.id}`,
            request.payload
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },

    EditProductionPlanStatus(request) {
      return new Promise((resolve, reject) => {
        api
          .put(
            `cig-production/production-plan/production-planning/edit-status/${request.id}`,
            request.payload
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
  },
});
