import { computed, onMounted, ref } from 'vue'

import {
  createVehicle as createVehicleRequest,
  deleteVehicle as deleteVehicleRequest,
  getVehicles,
  updateVehicle as updateVehicleRequest,
} from '../api/vehicleApi'

export function useVehicles() {
  const vehicles = ref([])
  const filter = ref('all')
  const isLoading = ref(true)
  const errorMessage = ref('')

  const filteredVehicles = computed(() => {
    if (filter.value === 'available') {
      return vehicles.value.filter((vehicle) => vehicle.available)
    }

    if (filter.value === 'unavailable') {
      return vehicles.value.filter((vehicle) => !vehicle.available)
    }

    return vehicles.value
  })

  async function loadVehicles() {
    isLoading.value = true
    errorMessage.value = ''

    try {
      vehicles.value = await getVehicles()
    } catch {
      vehicles.value = []
      errorMessage.value = 'Backend is not reachable. Showing an empty fleet table.'
    } finally {
      isLoading.value = false
    }
  }

  async function createVehicle(vehicle) {
    try {
      const createdVehicle = await createVehicleRequest(vehicle)
      vehicles.value = [...vehicles.value, createdVehicle]
      errorMessage.value = ''
    } catch {
      errorMessage.value = 'Vehicle creation failed.'
    }
  }

  async function updateVehicle(id, vehicle) {
    try {
      const updatedVehicle = await updateVehicleRequest(id, vehicle)
      vehicles.value = vehicles.value.map((currentVehicle) =>
        currentVehicle.id === updatedVehicle.id ? updatedVehicle : currentVehicle,
      )
      errorMessage.value = ''
    } catch {
      errorMessage.value = 'Vehicle update failed.'
    }
  }

  async function deleteVehicle(id) {
    try {
      await deleteVehicleRequest(id)
      vehicles.value = vehicles.value.filter((vehicle) => vehicle.id !== id)
      errorMessage.value = ''
    } catch {
      errorMessage.value = 'Vehicle deletion failed.'
    }
  }

  onMounted(loadVehicles)

  return {
    vehicles,
    filter,
    filteredVehicles,
    isLoading,
    errorMessage,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  }
}
