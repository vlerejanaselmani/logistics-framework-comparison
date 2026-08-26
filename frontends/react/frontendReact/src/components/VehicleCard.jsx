import {Link} from 'react-router-dom'
import { memo } from 'react'

function VehicleCard({ vehicle, onDeleteVehicle, onEditVehicle }) {
    return (
        <li>
            <Link to={`/vehicles/${vehicle.id}`}>
            {vehicle.registrationNumber} - {vehicle.type} - {vehicle.capacityKg} kg - {vehicle.available ? 'Available' : 'Unavailable'}
        </Link>
        <button type="button" onClick={() => onDeleteVehicle(vehicle.id)}>
        Delete this vehicle
        </button>
        <button type="button" onClick={() => onEditVehicle(vehicle)}>
        Edit
        </button>
        </li>
    )
}

export default memo(VehicleCard)

//component + props