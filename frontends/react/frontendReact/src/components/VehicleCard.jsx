import {Link} from 'react-router-dom'

function VehicleCard({ vehicle }) {
    return (
        <li>
            <Link to={`/vehicles/${vehicle.id}`}>
            {vehicle.registrationNumber} - {vehicle.type} - {vehicle.capacityKg} kg - {vehicle.available ? 'Available' : 'Unavailable'}
        </Link>
        </li>
    )
}

export default VehicleCard

//component + props