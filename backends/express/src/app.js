import cors from 'cors'
import express from 'express'

import { errorHandler } from './middleware/errorHandler.js'
import { vehicleRoutes } from './routes/vehicleRoutes.js'

export function createApp() {
  const app = express()
  const allowedOrigins = process.env.CLIENT_ORIGINS?.split(',') ?? [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:4200',
    'http://localhost:4201',
  ]

  app.use(cors({ origin: allowedOrigins }))
  app.use(express.json())

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' })
  })

  app.use('/api/vehicles', vehicleRoutes)
  app.use(errorHandler)

  return app
}
