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
          .catch((response) => {
            reject(response.data);
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
          .catch((response) => {
            reject(response.data);
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
          .catch((response) => {
            reject(response.data);
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
          .catch((response) => {
            reject(response.data);
          });
      });
    },
  },
});
