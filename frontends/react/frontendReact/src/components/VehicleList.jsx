import VehicleCard from './VehicleCard'

function VehicleList({ vehicles, onDeleteVehicle, onEditVehicle }) {
    if (vehicles.length===0){
        return <p>No vehicles found.</p>
    }

    return (
        <ul>
            {vehicles.map((vehicle) => (
            <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onDeleteVehicle={onDeleteVehicle}
            onEditVehicle={onEditVehicle}
            />
            ))}
        </ul>
    )
}

export default VehicleList

// props + list rendering + key