<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  vehicleToEdit: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['save-vehicle', 'clear-edit'])

const emptyVehicleForm = {
  registrationNumber: '',
  type: '',
  capacityKg: 0,
  available: true,
}

const formData = reactive({ ...emptyVehicleForm })

watch(
  () => props.vehicleToEdit,
  (vehicle) => {
    if (!vehicle) {
      resetForm()
      return
    }

    formData.registrationNumber = vehicle.registrationNumber
    formData.type = vehicle.type
    formData.capacityKg = vehicle.capacityKg
    formData.available = vehicle.available
  },
)

function resetForm() {
  Object.assign(formData, emptyVehicleForm)
}

function clearEdit() {
  resetForm()
  emit('clear-edit')
}

function submitForm() {
  emit('save-vehicle', {
    ...formData,
    capacityKg: Number(formData.capacityKg),
  })

  resetForm()
}
</script>

<template>
  <form class="vehicle-form" @submit.prevent="submitForm">
    <div class="form-header">
      <h2>{{ vehicleToEdit ? 'Update vehicle' : 'Add vehicle' }}</h2>
      <button type="button" class="ghost-button" :disabled="!vehicleToEdit" @click="clearEdit">
        Clear
      </button>
    </div>

    <label>
      Registration number
      <input v-model.trim="formData.registrationNumber" type="text" required placeholder="TR-001" />
    </label>

    <label>
      Type
      <input v-model.trim="formData.type" type="text" required placeholder="Truck" />
    </label>

    <label>
      Capacity kg
      <input v-model.number="formData.capacityKg" type="number" min="0" required />
    </label>

    <label class="checkbox-row">
      <input v-model="formData.available" type="checkbox" />
      Available
    </label>

    <button class="primary-button" type="submit">
      {{ vehicleToEdit ? 'Save changes' : 'Create vehicle' }}
    </button>
  </form>
</template>
