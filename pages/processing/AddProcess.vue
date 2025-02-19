<template>
  <MainContentWrapper>
    <PageBreadcrumbs
      title="Processing"
      :items="[
        {
          label: 'Processing',
          to: { name: 'view-processes' },
        },
        {
          label: 'Add Process',
          to: { name: 'add-process' },
        },
      ]"
    />

    <!-- Compounding/Mixing -->
    <SectionWrapperLoader v-if="loading" has-header class="q-mb-xl q-mt-xl" />
    <SectionWrapper v-else class="q-mt-xl">
      <template #header>
        <p class="text-grey-8">
          Please fill out the required fields <span class="text-red">*</span>
        </p>
      </template>

      <template #default>
        <!-- Production batch number -->
        <div class="q-mt-xl row full-width">
          <div
            class="full-width"
            style="max-width: 304px; margin-right: 34px !important"
          >
            <label>
              Production Batch Number <span class="text-red">*</span>
            </label>
            <q-input
              outlined
              v-model="productionBatchNumber"
              dense
              class="q-mt-sm"
              :rules="[
                (val) =>
                  (val !== null && val !== undefined) || 'Field is required',
              ]"
            />
          </div>
          <div class="full-width" style="max-width: 304px">
            <label>SOP Reference <span class="text-red">*</span></label>
            <q-file
              outlined
              v-model="sopReference"
              dense
              class="q-mt-sm"
              :rules="[(val) => !!val || 'Field is required']"
            >
              <template v-slot:append>
                <q-icon name="upload" />
              </template>
            </q-file>
          </div>
        </div>

        <div
          v-for="(process, index) in processes"
          :key="process.key"
          class="relative-position q-pa-xl"
          :class="{ 'q-mt-xl': index !== 0, 'q-mt-md': index === 0 }"
          style="border: 1px solid #c6c6c6"
        >
          <!-- Process Details -->
          <div
            class="row justify-between full-height no-wrap"
            style="gap: 68px"
          >
            <q-btn
              v-if="index !== 0"
              unelevated
              icon="delete"
              class="absolute fixed-top-right q-ma-sm"
              @click="openProcessDialog(process.key)"
            />

            <div class="q-gutter-y-md full-width">
              <!-- Process Name -->
              <div>
                <label>Process Name <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="process.process_name"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>

              <!-- Process Steps -->
              <div>
                <label>Process Steps <span class="text-red">*</span></label>
                <q-file
                  outlined
                  v-model="process.process_steps"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                >
                  <template v-slot:append>
                    <q-icon name="upload" />
                  </template>
                </q-file>
              </div>

              <!-- Standard Duration -->
              <div>
                <label>Standard Duration <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="process.standard_duration"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>

              <!-- Start Date & Time of Processing -->
              <div>
                <label>
                  Start Date & Time of Processing
                  <span class="text-red">*</span>
                </label>
                <q-input
                  outlined
                  v-model="process.start_date_and_time_of_processing"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="process.start_date_and_time_of_processing"
                          mask="YYYY-MM-DD HH:mm"
                          color="dark"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="process.start_date_and_time_of_processing"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
                          color="dark"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>

            <div class="q-gutter-y-md full-width">
              <!-- Operator Names -->
              <div>
                <label>Operator Names <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="process.operator_name"
                  type="textarea"
                  dense
                  class="q-mt-sm"
                  input-style="height: 108px"
                />
              </div>

              <!-- Remarks -->
              <div>
                <label>Remarks</label>
                <q-input
                  outlined
                  v-model="process.remarks"
                  type="textarea"
                  dense
                  class="q-mt-sm"
                  input-style="height: 108px"
                />
              </div>

              <!-- End Date & Time of Processing -->
              <div>
                <label>
                  End Date & Time of Processing
                  <span class="text-red">*</span>
                </label>
                <q-input
                  outlined
                  v-model="process.end_date_and_time_of_processing"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="process.end_date_and_time_of_processing"
                          mask="YYYY-MM-DD HH:mm"
                          color="dark"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="process.end_date_and_time_of_processing"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
                          color="dark"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <!-- Equipment Details -->
          <div class="column q-mt-xl">
            <h6 class="q-ma-none">Equipment Details</h6>
            <div
              v-for="(equipment, index) in process.equipment_details"
              :key="equipment.key"
              class="relative-position q-pa-xl"
              :class="{ 'q-mt-xl': index !== 0, 'q-mt-md': index === 0 }"
              style="border: 1px solid #c6c6c6"
            >
              <q-btn
                v-if="index !== 0"
                unelevated
                icon="delete"
                class="absolute fixed-top-right q-ma-sm"
                @click="openEquipmentDetailsDeleteDialog(equipment.key)"
              />

              <div
                class="row justify-between full-height no-wrap"
                style="gap: 68px"
              >
                <div class="q-gutter-y-md full-width">
                  <!-- Equipment Name -->
                  <div>
                    <label
                      >Equipment Name <span class="text-red">*</span></label
                    >
                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="equipment.equipment_name"
                      :options="equipmentNameOptions"
                      :option-label="equipmentNameOptions.label"
                      :option-value="equipmentNameOptions.value"
                      input-debounce="500"
                      hide-selected
                      hide-dropdown-icon
                      fill-input
                      map-options
                      emit-value
                      @filter="filterEquipmentName"
                      :rules="[
                        (val) =>
                          (val !== null && val !== undefined) ||
                          'Field is required',
                      ]"
                      class="q-mt-sm"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-select>
                  </div>

                  <!-- Verification -->
                  <div>
                    <label>Verification</label>
                    <q-input
                      outlined
                      v-model="equipment.verification"
                      type="textarea"
                      dense
                      class="q-mt-sm"
                      input-style="height: 140px"
                    />
                  </div>

                  <!-- Verification Status -->
                  <div style="margin-top: 39px">
                    <label
                      >Verification Status
                      <span class="text-red">*</span></label
                    >
                    <q-select
                      outlined
                      dense
                      v-model="equipment.verification_status"
                      :options="verificationStatusOptions"
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                </div>

                <div class="q-gutter-y-md full-width">
                  <!-- Date Code Verification -->
                  <div style="height: 90px">
                    <label> Date Code Verification </label>
                    <q-input
                      outlined
                      v-model="equipment.date_code_verification"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            ref="qDateProxy"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              minimal
                              v-model="equipment.date_code_verification"
                              mask="YYYY-MM-DD"
                            />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <!-- QC Inspector -->
                  <div>
                    <label>
                      QC Inspector
                      <span class="text-red">*</span>
                    </label>

                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="equipment.qc_inspector"
                      :options="qcInspectorOptions"
                      option-label="label"
                      option-value="value"
                      input-debounce="500"
                      hide-selected
                      hide-dropdown-icon
                      fill-input
                      map-options
                      emit-value
                      @filter="filterQcInspectors"
                      :rules="[
                        (val) =>
                          (val !== null && val !== undefined) ||
                          'Field is required',
                      ]"
                      class="q-mt-sm"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-select>
                  </div>

                  <!-- Verified By -->
                  <div>
                    <label>
                      Verified By
                      <span class="text-red">*</span>
                    </label>

                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="equipment.verified_by"
                      :options="verifiedByOptions"
                      option-label="label"
                      option-value="value"
                      input-debounce="500"
                      hide-selected
                      hide-dropdown-icon
                      fill-input
                      map-options
                      emit-value
                      @filter="filterVerifiedByPersonnels"
                      :rules="[
                        (val) =>
                          (val !== null && val !== undefined) ||
                          'Field is required',
                      ]"
                      class="q-mt-sm"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-select>
                  </div>

                  <!-- Verification Date and Time -->
                  <div>
                    <label>
                      Verification Date and Time
                      <span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="equipment.verification_date_and_time"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="equipment.verification_date_and_time"
                              mask="YYYY-MM-DD HH:mm"
                              color="dark"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>

                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time
                              v-model="equipment.verification_date_and_time"
                              mask="YYYY-MM-DD HH:mm"
                              format24h
                              color="dark"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>

              <div
                v-if="
                  equipment.verification_status &&
                  equipment.verification_status.value === 1
                "
                class="row justify-between full-height no-wrap q-mt-lg"
                style="gap: 68px"
              >
                <div class="q-gutter-y-md full-width">
                  <!-- Issue Identified -->
                  <div>
                    <label>Issue Identified</label>
                    <q-input
                      outlined
                      v-model="equipment.issue_identified"
                      type="textarea"
                      dense
                      class="q-mt-sm"
                      input-style="height: 140px"
                    />
                  </div>

                  <!-- Corrected By -->
                  <div>
                    <label>
                      Corrected By
                      <span class="text-red">*</span>
                    </label>

                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="equipment.corrected_by"
                      :options="correctedByOptions"
                      option-label="label"
                      option-value="value"
                      input-debounce="500"
                      hide-selected
                      hide-dropdown-icon
                      fill-input
                      map-options
                      emit-value
                      @filter="filterCorrectedByPersonnels"
                      :rules="[
                        (val) =>
                          (val !== null && val !== undefined) ||
                          'Field is required',
                      ]"
                      class="q-mt-sm"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-select>
                  </div>
                </div>

                <div class="q-gutter-y-md full-width">
                  <!-- Corrective Action -->
                  <div>
                    <label>Corrective Action</label>
                    <q-input
                      outlined
                      v-model="equipment.corrective_action"
                      type="textarea"
                      dense
                      class="q-mt-sm"
                      input-style="height: 140px"
                    />
                  </div>

                  <!-- Corrected Date and Time -->
                  <div>
                    <label>
                      Corrected Date and Time
                      <span class="text-red">*</span>
                    </label>
                    <q-input
                      outlined
                      v-model="equipment.corrected_date_and_time"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="
                                equipment.start_date_and_time_of_processing
                              "
                              mask="YYYY-MM-DD HH:mm"
                              color="dark"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>

                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time
                              v-model="
                                equipment.start_date_and_time_of_processing
                              "
                              mask="YYYY-MM-DD HH:mm"
                              format24h
                              color="dark"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="addEquipmentDetailsLoading"
              class="q-mt-xl"
              style="border: 1px solid #c6c6c6"
            >
              <SectionWrapperLoader class="q-mt-xl" />
            </div>

            <div class="q-mt-xl">
              <q-btn
                @click="addEquipment(process.key)"
                no-caps
                flat
                class="bg-primary text-white"
              >
                <q-spinner
                  v-if="addEquipmentDetailsLoading"
                  size="24px"
                  color="positive"
                  class="q-mr-md"
                />
                Add Equipment
              </q-btn>
            </div>
          </div>

          <!-- Material Details -->
          <div class="column q-gutter-y-xl q-mt-xl">
            <h6 class="q-ma-none">Material Details</h6>
            <div
              v-for="(material, index) in process.material_details"
              :key="material.key"
              class="relative-position q-pa-xl"
              :class="{ 'q-mt-xl': index !== 0, 'q-mt-md': index === 0 }"
              style="border: 1px solid #c6c6c6"
            >
              <q-btn
                v-if="index !== 0"
                unelevated
                icon="delete"
                class="absolute fixed-top-right q-ma-sm"
                @click="openMaterialDetailsDeleteDialog(material.key)"
              />

              <div
                class="row justify-between full-height no-wrap"
                style="gap: 68px"
              >
                <div class="q-gutter-y-md full-width">
                  <!-- Material Name -->
                  <div>
                    <label>Material Name <span class="text-red">*</span></label>
                    <q-select
                      use-input
                      outlined
                      dense
                      v-model="material.material_name"
                      :options="materialNameOptions"
                      :option-label="materialNameOptions.label"
                      :option-value="materialNameOptions.value"
                      input-debounce="500"
                      hide-selected
                      hide-dropdown-icon
                      fill-input
                      map-options
                      emit-value
                      @filter="filterMaterialName"
                      :rules="[
                        (val) =>
                          (val !== null && val !== undefined) ||
                          'Field is required',
                      ]"
                      class="q-mt-sm"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-select>
                  </div>

                  <!-- Lot Number -->
                  <div>
                    <label>Lot Number <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="material.lot_number"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                </div>

                <div class="q-gutter-y-md full-width">
                  <!-- Used-by Date -->
                  <div style="height: 90px">
                    <label> Used-by Date </label>
                    <q-input
                      outlined
                      v-model="material.used_by_date"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            ref="qDateProxy"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              minimal
                              v-model="material.used_by_date"
                              mask="YYYY-MM-DD"
                            />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <!-- Quantity -->
                  <div>
                    <label>Quantity <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      v-model="material.quantity"
                      dense
                      class="q-mt-sm"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="addMaterialDetailsLoading"
              class="q-mt-xl"
              style="border: 1px solid #c6c6c6"
            >
              <SectionWrapperLoader class="q-mt-xl" />
            </div>

            <div class="q-mt-xl">
              <q-btn
                @click="addMaterial(process.key)"
                no-caps
                flat
                class="bg-primary text-white"
              >
                <q-spinner
                  v-if="addMaterialDetailsLoading"
                  size="24px"
                  color="positive"
                  class="q-mr-md"
                />
                Add Material
              </q-btn>
            </div>
          </div>
        </div>
      </template>
    </SectionWrapper>

    <!-- Delete Process Dialog -->
    <q-dialog v-model="showProcessDeleteDialog" persistent>
      <q-card class="q-px-xl relative-position">
        <q-icon
          name="cancel"
          color="grey"
          size="sm"
          class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
          @click="closeProcessDeleteDialog"
        />
        <q-card-section class="text-center q-mt-lg">
          <q-icon name="delete" color="red-10" size="lg" />
          <div class="text-h6 text-weight-bold">Delete Confirmation</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          Are you sure you want to delete this process?
        </q-card-section>

        <q-card-section
          v-if="selectedProcess.process_name !== null"
          class="q-pt-none text-center"
        >
          <span class="text-bold">Process Name: </span>
          {{ selectedProcess.process_name }}
        </q-card-section>

        <q-card-section class="flex justify-center q-my-lg">
          <q-btn
            flat
            no-caps
            label="Cancel"
            class="border-000000-all q-px-lg"
            v-close-popup
          />
          <div class="q-mx-md"></div>
          <q-btn
            flat
            no-caps
            class="bg-accent text-white q-px-lg"
            @click="deleteSelectedProcess(selectedProcess.key)"
            :disable="deleteProcessLoading"
          >
            <q-spinner v-if="deleteProcessLoading" />
            <span v-else>Confirm</span>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Delete Equipment Details Dialog -->
    <q-dialog v-model="showEquipmentDetailsDeleteDialog" persistent>
      <q-card class="q-px-xl relative-position">
        <q-icon
          name="cancel"
          color="grey"
          size="sm"
          class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
          @click="closeEquipmentDetailsDeleteDialog"
        />
        <q-card-section class="text-center q-mt-lg">
          <q-icon name="delete" color="red-10" size="lg" />
          <div class="text-h6 text-weight-bold">Delete Confirmation</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          Are you sure you want to delete the equipment from the process?
        </q-card-section>

        <q-card-section
          v-if="selectedEquipmentDetails.equipment_name !== null"
          class="q-pt-none text-center"
        >
          <span class="text-bold">Equipment Name: </span>
          {{ selectedEquipmentDetails.equipment_name }}
        </q-card-section>

        <q-card-section class="flex justify-center q-my-lg">
          <q-btn
            flat
            no-caps
            label="Cancel"
            class="border-000000-all q-px-lg"
            v-close-popup
          />
          <div class="q-mx-md"></div>
          <q-btn
            flat
            no-caps
            class="bg-accent text-white q-px-lg"
            @click="
              deleteSelectedEquipmentDetails(selectedEquipmentDetails.key)
            "
            :disable="deleteEquipmentDetailsLoading"
          >
            <q-spinner v-if="deleteEquipmentDetailsLoading" />
            <span v-else>Confirm</span>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Delete Material Details Dialog -->
    <q-dialog v-model="showMaterialDetailsDeleteDialog" persistent>
      <q-card class="q-px-xl relative-position">
        <q-icon
          name="cancel"
          color="grey"
          size="sm"
          class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
          @click="closeMaterialDetailsDeleteDialog"
        />
        <q-card-section class="text-center q-mt-lg">
          <q-icon name="delete" color="red-10" size="lg" />
          <div class="text-h6 text-weight-bold">Delete Confirmation</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          Are you sure you want to delete the material?
        </q-card-section>

        <q-card-section
          v-if="selectedMaterialDetails.material_name !== null"
          class="q-pt-none text-center"
        >
          <span class="text-bold">Material Name: </span>
          {{ selectedMaterialDetails.material_name }}
        </q-card-section>

        <q-card-section class="flex justify-center q-my-lg">
          <q-btn
            flat
            no-caps
            label="Cancel"
            class="border-000000-all q-px-lg"
            v-close-popup
          />
          <div class="q-mx-md"></div>
          <q-btn
            flat
            no-caps
            class="bg-accent text-white q-px-lg"
            @click="deleteSelectedMaterialDetails(selectedMaterialDetails.key)"
            :disable="deleteMaterialDetailsLoading"
          >
            <q-spinner v-if="deleteMaterialDetailsLoading" />
            <span v-else>Confirm</span>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Action Buttons -->
    <div class="q-mt-xl">
      <q-btn @click="addProcess" no-caps flat class="bg-primary text-white">
        <q-spinner
          v-if="addProcessLoading"
          size="24px"
          color="positive"
          class="q-mr-md"
        />
        Add Process
      </q-btn>
    </div>

    <div>
      <q-btn
        @click="saveProcess"
        label="Save"
        no-caps
        flat
        class="bg-accent text-white q-mt-xl"
        style="width: 322px; height: 46px; font-size: 1rem; font-weight: 700"
      />
    </div>
  </MainContentWrapper>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";

import MainContentWrapper from "../../components/MainContentWrapper.vue";
import PageBreadcrumbs from "../../components/PageBreadcrumbs.vue";
import SectionWrapper from "../../components/SectionWrapper.vue";
import SectionWrapperLoader from "../../components/SectionWrapperLoader.vue";

// Variables
const $q = useQuasar();
const loading = ref(false);
const productionBatchNumber = ref("");
const sopReference = ref(null);

const processes = ref([]);

const equipmentNameOptions = ref([
  { label: "Equipment A - EN-100001", value: 0 },
  { label: "Equipment B - EN-100002", value: 1 },
  { label: "Equipment C - EN-100003", value: 2 },
  { label: "Equipment D - EN-100004", value: 3 },
  { label: "Equipment E - EN-100005", value: 4 },
]);

const verificationStatusOptions = ref([
  {
    label: "Pass",
    value: 0,
  },
  {
    label: "Fail",
    value: 1,
  },
]);

const qcInspectorOptions = ref([
  {
    label: "John Doe",
    value: 0,
  },
  {
    label: "Jane Doe",
    value: 1,
  },
  {
    label: "Inspector C",
    value: 2,
  },
  {
    label: "Inspector D",
    value: 3,
  },
  {
    label: "Inspector E",
    value: 4,
  },
]);

const verifiedByOptions = ref([
  {
    label: "John Doe",
    value: 0,
  },
  {
    label: "Jane Doe",
    value: 1,
  },
  {
    label: "Personnel C",
    value: 2,
  },
  {
    label: "Personnel D",
    value: 3,
  },
  {
    label: "Personnel E",
    value: 4,
  },
]);

const correctedByOptions = ref([
  {
    label: "John Doe",
    value: 0,
  },
  {
    label: "Jane Doe",
    value: 1,
  },
  {
    label: "Corrected By Personnel C",
    value: 2,
  },
  {
    label: "Corrected By Personnel D",
    value: 3,
  },
  {
    label: "Corrected By Personnel E",
    value: 4,
  },
]);

const materialNameOptions = ref([
  { label: "Material A - MT - 10001", value: 0 },
  { label: "Material B - MT - 10002", value: 1 },
  { label: "Material C - MT - 10003", value: 2 },
  { label: "Material D - MT - 10004", value: 3 },
  { label: "Material E - MT - 10005", value: 4 },
]);

const saveProcessLoading = ref(false);

const addProcessLoading = ref(false);
const showProcessDeleteDialog = ref(false);
const deleteProcessLoading = ref(false);
const selectedProcess = ref(null);

const addEquipmentDetailsLoading = ref(false);
const showEquipmentDetailsDeleteDialog = ref(false);
const deleteEquipmentDetailsLoading = ref(false);
const selectedEquipmentDetails = ref(null);

const addMaterialDetailsLoading = ref(false);
const showMaterialDetailsDeleteDialog = ref(false);
const deleteMaterialDetailsLoading = ref(false);
const selectedMaterialDetails = ref(null);

// Lifecycle Hooks
onMounted(() => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 1000);

  addSampleProcess();
});

// Functions
// add the first process into the array
const addSampleProcess = () => {
  processes.value.push({
    key: Date.now(),
    process_name: null,
    process_steps: null,
    standard_duration: null,
    start_date_and_time_of_processing: null,
    operator_name: null,
    remarks: null,
    end_date_and_time_of_processing: null,
    equipment_details: [
      {
        key: Date.now(),
        equipment_name: null,
        verification: null,
        verification_status: null,
        date_code_verification: null,
        qc_inspector: null,
        verified_by: null,
        verification_date_and_time: null,
        issue_identified: null,
        corrected_by: null,
        corrective_action: null,
        corrected_date_and_time: null,
      },
    ],
    material_details: [
      {
        key: Date.now(),
        material_name: null,
        lot_number: null,
        used_by_date: null,
        quantity: null,
      },
    ],
  });
};

// Functions - Process
const addProcess = () => {
  addProcessLoading.value = true;

  setTimeout(() => {
    addSampleProcess();

    addProcessLoading.value = false;
  }, 1000);
};

const openProcessDialog = (key) => {
  const process = processes.value.find((process) => process.key === key);

  selectedProcess.value = { ...process };

  showProcessDeleteDialog.value = true;
};

const closeProcessDeleteDialog = () => {
  showProcessDeleteDialog.value = false;
};

const deleteSelectedProcess = (key) => {
  deleteProcessLoading.value = true;

  setTimeout(() => {
    processes.value = processes.value.filter((process) => process.key !== key);

    deleteProcessLoading.value = false;
    showProcessDeleteDialog.value = false;
  }, 1000);
};

// Functions - Equipment Details
const addEquipment = (key) => {
  addEquipmentDetailsLoading.value = true;

  setTimeout(() => {
    const process = processes.value.find((process) => process.key === key);

    process.equipment_details.push({
      key: Date.now(),
      equipment_name: null,
      verification: null,
      verification_status: null,
      date_code_verification: null,
      qc_inspector: null,
      verified_by: null,
      verification_date_and_time: null,
      issue_identified: null,
      corrected_by: null,
      corrective_action: null,
      corrected_date_and_time: null,
    });

    addEquipmentDetailsLoading.value = false;
  }, 1000);
};

const openEquipmentDetailsDeleteDialog = (key) => {
  const process = processes.value.find((process) =>
    process.equipment_details.find((equipment) => equipment.key === key)
  );

  const equipment = process.equipment_details.find(
    (equipment) => equipment.key === key
  );

  selectedEquipmentDetails.value = { ...equipment };

  const equipmentOption = equipmentNameOptions.value.find(
    (option) => option.value === selectedEquipmentDetails.value.equipment_name
  );
  selectedEquipmentDetails.value.equipment_name = equipmentOption
    ? equipmentOption.label
    : null;

  showEquipmentDetailsDeleteDialog.value = true;
};

const closeEquipmentDetailsDeleteDialog = () => {
  showEquipmentDetailsDeleteDialog.value = false;
};

const deleteSelectedEquipmentDetails = (key) => {
  deleteEquipmentDetailsLoading.value = true;

  setTimeout(() => {
    processes.value.forEach((process) => {
      process.equipment_details = process.equipment_details.filter(
        (equipment) => equipment.key !== key
      );
    });

    deleteEquipmentDetailsLoading.value = false;
    showEquipmentDetailsDeleteDialog.value = false;
  }, 1000);
};

const filterEquipmentName = (val, update) => {
  update(() => {
    equipmentNameOptions.value = [
      { label: "Equipment A - EN-100001", value: 0 },
      { label: "Equipment B - EN-100002", value: 1 },
      { label: "Equipment C - EN-100003", value: 2 },
      { label: "Equipment D - EN-100004", value: 3 },
      { label: "Equipment E - EN-100005", value: 4 },
    ];
  });

  update(() => {
    const needle = val.toLowerCase();
    equipmentNameOptions.value = equipmentNameOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const filterQcInspectors = (val, update) => {
  update(() => {
    qcInspectorOptions.value = [
      {
        label: "John Doe",
        value: 0,
      },
      {
        label: "Jane Doe",
        value: 1,
      },
      {
        label: "Inspector C",
        value: 2,
      },
      {
        label: "Inspector D",
        value: 3,
      },
      {
        label: "Inspector E",
        value: 4,
      },
    ];
  });

  update(() => {
    const needle = val.toLowerCase();
    qcInspectorOptions.value = qcInspectorOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const filterVerifiedByPersonnels = (val, update) => {
  update(() => {
    verifiedByOptions.value = [
      {
        label: "John Doe",
        value: 0,
      },
      {
        label: "Jane Doe",
        value: 1,
      },
      {
        label: "Personnel C",
        value: 2,
      },
      {
        label: "Personnel D",
        value: 3,
      },
      {
        label: "Personnel E",
        value: 4,
      },
    ];
  });

  update(() => {
    const needle = val.toLowerCase();
    verifiedByOptions.value = verifiedByOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const filterCorrectedByPersonnels = (val, update) => {
  update(() => {
    correctedByOptions.value = [
      {
        label: "John Doe",
        value: 0,
      },
      {
        label: "Jane Doe",
        value: 1,
      },
      {
        label: "Corrected By Personnel C",
        value: 2,
      },
      {
        label: "Corrected By Personnel D",
        value: 3,
      },
      {
        label: "Corrected By Personnel E",
        value: 4,
      },
    ];
  });

  update(() => {
    const needle = val.toLowerCase();
    correctedByOptions.value = correctedByOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

// Functions - Material Details
const addMaterial = (key) => {
  addMaterialDetailsLoading.value = true;

  setTimeout(() => {
    const process = processes.value.find((process) => process.key === key);

    process.material_details.push({
      key: Date.now(),
      material_name: null,
      lot_number: null,
      used_by_date: null,
      quantity: null,
    });

    addMaterialDetailsLoading.value = false;
  }, 1000);
};

const openMaterialDetailsDeleteDialog = (key) => {
  const process = processes.value.find((process) =>
    process.material_details.find((material) => material.key === key)
  );

  const material = process.material_details.find(
    (material) => material.key === key
  );

  selectedMaterialDetails.value = { ...material };

  const materialOption = materialNameOptions.value.find(
    (option) => option.value === selectedMaterialDetails.value.material_name
  );
  selectedMaterialDetails.value.material_name = materialOption
    ? materialOption.label
    : null;

  showMaterialDetailsDeleteDialog.value = true;
};

const closeMaterialDetailsDeleteDialog = () => {
  showMaterialDetailsDeleteDialog.value = false;
};

const deleteSelectedMaterialDetails = (key) => {
  deleteMaterialDetailsLoading.value = true;

  setTimeout(() => {
    processes.value.forEach((process) => {
      process.material_details = process.material_details.filter(
        (material) => material.key !== key
      );
    });

    deleteMaterialDetailsLoading.value = false;
    showMaterialDetailsDeleteDialog.value = false;
  }, 1000);
};

const filterMaterialName = (val, update) => {
  update(() => {
    materialNameOptions.value = [
      { label: "Material A - MT - 10001", value: 0 },
      { label: "Material B - MT - 10002", value: 1 },
      { label: "Material C - MT - 10003", value: 2 },
      { label: "Material D - MT - 10004", value: 3 },
      { label: "Material E - MT - 10005", value: 4 },
    ];
  });

  update(() => {
    const needle = val.toLowerCase();
    materialNameOptions.value = materialNameOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

// save the whole process
const saveProcess = () => {
  saveProcessLoading.value = true;

  let payload = {
    productionBatchNumber: productionBatchNumber.value,
    sopReference: sopReference.value,
    processes: processes.value,
  };

  setTimeout(() => {
    console.log("Process Saved", payload);

    $q.notify({
      html: true,
      message: `<strong>Success!</strong> Process saved successfully.`,
      position: "top-right",
      timeout: 2000,
      classes: "quasar-notification-success",
    });

    saveProcessLoading.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
:deep(.q-textarea .q-field__native) {
  resize: none;
}
</style>
