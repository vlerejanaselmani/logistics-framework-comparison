import { vehicleService } from '../services/vehicleService.js'

function parseId(id) {
  const parsedId = Number(id)

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    const error = new Error('Invalid vehicle id')
    error.status = 400
    throw error
  }

  return parsedId
}

export const vehicleController = {
  getVehicles(_request, response) {
    response.json(vehicleService.getAllVehicles())
  },

  getVehicleById(request, response) {
    const vehicle = vehicleService.getVehicleById(parseId(request.params.id))
    response.json(vehicle)
  },

  addVehicle(request, response) {
    const vehicle = vehicleService.addVehicle(request.body)
    response.status(201).json(vehicle)
  },

  updateVehicle(request, response) {
    const vehicle = vehicleService.updateVehicle(parseId(request.params.id), request.body)
    response.json(vehicle)
  },

  deleteVehicle(request, response) {
    vehicleService.removeVehicleById(parseId(request.params.id))
    response.status(204).send()
  },
}
