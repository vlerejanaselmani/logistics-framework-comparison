import { createContext, useContext } from 'react'
import useVehicles from '../hooks/useVehicles'

const VehicleContext = createContext(null)

export function VehicleProvider({ children }) {
    const vehicleData = useVehicles()

    return (
        <VehicleContext.Provider value={vehicleData}>
            {children}
        </VehicleContext.Provider>
    )
}

export function useVehicleContext(){
    const context = useContext(VehicleContext)

        if(!context) {
            throw new Error('useVehicleContext must be used inside VehicleProvider')
        }

    return context
}