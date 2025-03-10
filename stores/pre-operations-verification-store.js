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
    },
  }
);
