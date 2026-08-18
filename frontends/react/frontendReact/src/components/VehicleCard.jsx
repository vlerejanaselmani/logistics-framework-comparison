import {Link} from 'react-router-dom'
import { memo } from 'react'

function VehicleCard({ vehicle }) {
    return (
        <li>
            <Link to={`/vehicles/${vehicle.id}`}>
            {vehicle.registrationNumber} - {vehicle.type} - {vehicle.capacityKg} kg - {vehicle.available ? 'Available' : 'Unavailable'}
        </Link>
        </li>
    )
}

export default memo(VehicleCard)

//component + props