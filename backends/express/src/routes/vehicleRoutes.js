import { Router } from 'express'

import { vehicleController } from '../controllers/vehicleController.js'

export const vehicleRoutes = Router()

vehicleRoutes.get('/', vehicleController.getVehicles)
vehicleRoutes.get('/:id', vehicleController.getVehicleById)
vehicleRoutes.post('/', vehicleController.addVehicle)
vehicleRoutes.put('/:id', vehicleController.updateVehicle)
vehicleRoutes.delete('/:id', vehicleController.deleteVehicle)
