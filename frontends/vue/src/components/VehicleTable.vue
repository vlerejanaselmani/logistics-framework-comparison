<script setup>
defineProps({
  vehicles: {
    type: Array,
    required: true,
  },
})

defineEmits(['edit-vehicle', 'delete-vehicle'])
</script>

<template>
  <div class="table-shell">
    <table>
      <thead>
        <tr>
          <th>Registration</th>
          <th>Type</th>
          <th>Capacity</th>
          <th>Available</th>
          <th class="actions-column">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="vehicles.length === 0">
          <td class="empty-cell" colspan="5">No vehicles found.</td>
        </tr>

        <tr v-for="vehicle in vehicles" :key="vehicle.id">
          <td>
            <RouterLink class="table-link" :to="`/vehicles/${vehicle.id}`">
              {{ vehicle.registrationNumber }}
            </RouterLink>
          </td>
          <td>{{ vehicle.type }}</td>
          <td>{{ vehicle.capacityKg }} kg</td>
          <td>
            <span class="status-pill" :class="{ unavailable: !vehicle.available }">
              {{ vehicle.available ? 'Yes' : 'No' }}
            </span>
          </td>
          <td class="actions-cell">
            <button type="button" @click="$emit('edit-vehicle', vehicle)">Edit</button>
            <button type="button" class="danger-button" @click="$emit('delete-vehicle', vehicle.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
