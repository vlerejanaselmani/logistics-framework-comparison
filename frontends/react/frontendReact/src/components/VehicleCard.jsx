function VehicleCard({ vehicle }) {
    return (
        <li>
            {vehicle.registrationNumber} - {vehicle.type} - {vehicle.capacityKg} kg - {vehicle.available ? 'Available' : 'Unavailable'}
        </li>
    )
}

export default VehicleCard

//component + props