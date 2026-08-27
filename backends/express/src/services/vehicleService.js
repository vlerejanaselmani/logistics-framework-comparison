import { vehicleRepository } from '../repositories/vehicleRepository.js'

function validateVehicle(vehicleData) {
  const errors = []

  if (!vehicleData.registrationNumber?.trim()) {
    errors.push('registrationNumber is required')
  }

  if (!vehicleData.type?.trim()) {
    errors.push('type is required')
  }

  if (vehicleData.capacityKg === undefined || Number(vehicleData.capacityKg) <= 0) {
    errors.push('capacityKg must be greater than 0')
  }

  if (typeof vehicleData.available !== 'boolean') {
    errors.push('available must be true or false')
  }

  if (errors.length > 0) {
    const error = new Error('Validation failed')
    error.status = 400
    error.details = errors
    throw error
  }

  return {
    registrationNumber: vehicleData.registrationNumber.trim(),
    type: vehicleData.type.trim(),
    capacityKg: Number(vehicleData.capacityKg),
    available: vehicleData.available,
  }
}

export const vehicleService = {
  getAllVehicles() {
    return vehicleRepository.findAll()
  },

  getVehicleById(id) {
    const vehicle = vehicleRepository.findById(id)

    if (!vehicle) {
      const error = new Error('Vehicle not found')
      error.status = 404
      throw error
    }

    return vehicle
  },

  addVehicle(vehicleData) {
    return vehicleRepository.create(validateVehicle(vehicleData))
  },

  updateVehicle(id, vehicleData) {
    const updatedVehicle = vehicleRepository.update(id, validateVehicle(vehicleData))

    if (!updatedVehicle) {
      const error = new Error('Vehicle not found')
      error.status = 404
      throw error
    }

    return updatedVehicle
  },

  removeVehicleById(id) {
    const deleted = vehicleRepository.deleteById(id)

    if (!deleted) {
      const error = new Error('Vehicle not found')
      error.status = 404
      throw error
    }
  },
}
