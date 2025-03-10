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
              `production/preoperation-verification?offset=${request.offset}`
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
            .get(`production/preoperation-verification/${id}`)
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
              `production/preoperation-verification?search_keyword=${request.keyword}`
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
              `production/preoperation-verification/${request.id}`,
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
