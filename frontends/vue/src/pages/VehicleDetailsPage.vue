<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { getVehicleById } from '../api/vehicleApi'

const route = useRoute()
const vehicle = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  const id = Number(route.params.id)

  if (!id) {
    errorMessage.value = 'Invalid vehicle id.'
    isLoading.value = false
    return
  }

  try {
    vehicle.value = await getVehicleById(id)
  } catch {
    errorMessage.value = 'Vehicle was not found.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="details-page">
    <RouterLink class="back-link" to="/vehicles">Back to vehicles</RouterLink>

    <p v-if="isLoading" class="message">Loading vehicle...</p>
    <p v-else-if="errorMessage" class="message">{{ errorMessage }}</p>

    <section v-else-if="vehicle" class="details-panel">
      <p class="eyebrow">Vehicle profile</p>
      <h1>{{ vehicle.registrationNumber }}</h1>

      <dl>
        <div>
          <dt>Type</dt>
          <dd>{{ vehicle.type }}</dd>
        </div>
        <div>
          <dt>Capacity</dt>
          <dd>{{ vehicle.capacityKg }} kg</dd>
        </div>
        <div>
          <dt>Available</dt>
          <dd>{{ vehicle.available ? 'Yes' : 'No' }}</dd>
        </div>
      </dl>
    </section>
  </main>
</template>
