import { Vehicle } from '../models/Vehicle.js'

const vehicles = [
  new Vehicle({
    id: 1,
    registrationNumber: 'TR-001',
    type: 'Truck',
    capacityKg: 12000,
    available: true,
  }),
  new Vehicle({
    id: 2,
    registrationNumber: 'VN-204',
    type: 'Van',
    capacityKg: 1800,
    available: false,
  }),
]

let nextId = 3

export const vehicleRepository = {
  findAll() {
    return vehicles
  },

  findById(id) {
    return vehicles.find((vehicle) => vehicle.id === id) ?? null
  },

  create(vehicleData) {
    const vehicle = new Vehicle({
      id: nextId,
      ...vehicleData,
    })

    nextId += 1
    vehicles.push(vehicle)
    return vehicle
  },

  update(id, vehicleData) {
    const index = vehicles.findIndex((vehicle) => vehicle.id === id)

    if (index === -1) {
      return null
    }

    vehicles[index] = new Vehicle({
      id,
      ...vehicleData,
    })

    return vehicles[index]
  },

  deleteById(id) {
    const index = vehicles.findIndex((vehicle) => vehicle.id === id)

    if (index === -1) {
      return false
    }

    vehicles.splice(index, 1)
    return true
  },
}
