import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useProductionPlanStore = defineStore("production-plan", {
  state: () => ({}),
  actions: {
    GetProductionPlans(request) {
      return new Promise((resolve, reject) => {
        api
          .get(
            `production-management/production-planning?offset=${request.offset}`
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
          .get(`production-management/production-planning/${id}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },

    SearchProductionPlans(request) {
      const params = {};

      if (request.search_keyword) {
        params.search_keyword = request.search_keyword;
      }
      if (
        request.status &&
        request.status.value !== undefined &&
        request.status.value !== ""
      ) {
        params.status = request.status.value;
      }
      if (request.start_date_and_time) {
        params.start_date_and_time = request.start_date_and_time;
      }
      if (request.end_date_and_time) {
        params.end_date_and_time = request.end_date_and_time;
      }

      return new Promise((resolve, reject) => {
        api
          .get("production-management/production-planning", { params })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },

    // AddProductionPlan(request) {
    //   return new Promise((resolve, reject) => {
    //     api
    //       .post(
    //         "cig-production/production-plan/production-planning",
    //         request.payload
    //       )
    //       .then((response) => {
    //         resolve(response.data);
    //       })
    //       .catch((error) => {
    //         reject(error.response.data);
    //       });
    //   });
    // },

    // EditProductionPlan(request) {
    //   return new Promise((resolve, reject) => {
    //     api
    //       .put(
    //         `cig-production/production-plan/production-planning/${request.id}`,
    //         request.payload
    //       )
    //       .then((response) => {
    //         resolve(response.data);
    //       })
    //       .catch((error) => {
    //         reject(error.response.data);
    //       });
    //   });
    // },

    // ArchiveProductionPlan(request) {
    //   return new Promise((resolve, reject) => {
    //     api
    //       .put(
    //         `cig-production/production-plan/production-planning/archive/${request.id}`,
    //         request.payload
    //       )
    //       .then((response) => {
    //         resolve(response.data);
    //       })
    //       .catch((error) => {
    //         reject(error.response.data);
    //       });
    //   });
    // },

    // EditProductionPlanStatus(request) {
    //   return new Promise((resolve, reject) => {
    //     api
    //       .put(
    //         `cig-production/production-plan/production-planning/edit-status/${request.id}`,
    //         request.payload
    //       )
    //       .then((response) => {
    //         resolve(response.data);
    //       })
    //       .catch((error) => {
    //         reject(error.response.data);
    //       });
    //   });
    // },
  },
});
