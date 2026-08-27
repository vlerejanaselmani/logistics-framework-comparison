<script setup>
import { ref } from 'vue'

import VehicleForm from '../components/VehicleForm.vue'
import VehicleTable from '../components/VehicleTable.vue'
import { useVehicles } from '../composables/useVehicles'

const {
  vehicles,
  filter,
  filteredVehicles,
  isLoading,
  errorMessage,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = useVehicles()

const editingVehicle = ref(null)

function saveVehicle(vehicle) {
  if (editingVehicle.value) {
    updateVehicle(editingVehicle.value.id, vehicle)
    editingVehicle.value = null
    return
  }

  createVehicle(vehicle)
}

function startEditing(vehicle) {
  editingVehicle.value = vehicle
}
</script>

<template>
  <main class="vehicles-page">
    <section class="page-header">
      <div>
        <p class="eyebrow">Logistics fleet</p>
        <h1>Vehicles</h1>
      </div>

      <div class="summary-pill">{{ filteredVehicles.length }} shown / {{ vehicles.length }} total</div>
    </section>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <section class="content-grid">
      <VehicleForm
        :vehicle-to-edit="editingVehicle"
        @save-vehicle="saveVehicle"
        @clear-edit="editingVehicle = null"
      />

      <section class="table-area">
        <div class="filters">
          <button type="button" :class="{ active: filter === 'all' }" @click="filter = 'all'">
            All
          </button>
          <button
            type="button"
            :class="{ active: filter === 'available' }"
            @click="filter = 'available'"
          >
            Available
          </button>
          <button
            type="button"
            :class="{ active: filter === 'unavailable' }"
            @click="filter = 'unavailable'"
          >
            Unavailable
          </button>
        </div>

        <p v-if="isLoading" class="loading-message">Loading vehicles...</p>
        <VehicleTable
          v-else
          :vehicles="filteredVehicles"
          @edit-vehicle="startEditing"
          @delete-vehicle="deleteVehicle"
        />
      </section>
    </section>
  </main>
</template>
