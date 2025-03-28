import { defineStore } from "pinia";
import { api } from "boot/axios";

export const usePreOperationsVerificationStore = defineStore(
  "pre-operations-verification",
  {
    state: () => ({}),
    actions: {
      GetPreOperationVerifications(request) {
        return new Promise((resolve, reject) => {
          api
            .get(
              `production-management/preoperation-verification?offset=${request.offset}`
            )
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => {
              reject(error.response.data);
            });
        });
      },
      GetPreOperationVerification(id) {
        return new Promise((resolve, reject) => {
          api
            .get(`production-management/preoperation-verification/${id}`)
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => {
              reject(error.response.data);
            });
        });
      },
      SearchPreOperationVerifications(request) {
        return new Promise((resolve, reject) => {
          api
            .get(
              `production-management/preoperation-verification?search_keyword=${request.keyword}`
            )
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => {
              reject(error.response.data);
            });
        });
      },
      ArchivePreOperationVerification(request) {
        return new Promise((resolve, reject) => {
          api
            .post(
              `production-management/preoperation-verification/${request.id}`,
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
      GetProductionBatchNumber(request) {
        return new Promise((resolve, reject) => {
          api
            .get(
              `production-management/preoperation-verification?batch_number=${request.batch_number}`,
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
      GetUserInfo(request) {
        return new Promise((resolve, reject) => {
          api
            .get(
              `production-management/preoperation-verification?personnel_name=${request.personnel_name}`,
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

      AddPreOperationVerification(request) {
        return new Promise((resolve, reject) => {
          api
            .post(
              `production-management/preoperation-verification/`,
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

      EditPreOperationVerification(request) {
        return new Promise((resolve, reject) => {
          api
            .post(
              `production-management/preoperation-verification/${request.id}`,
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
  }
);
