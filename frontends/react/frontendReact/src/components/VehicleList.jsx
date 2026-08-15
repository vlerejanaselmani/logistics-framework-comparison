import VehicleCard from './VehicleCard'

function VehicleList({ vehicles }) {
    if (vehicles.length===0){
        return <p>No vehicles found.</p>
    }

    return (
        <ul>
            {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
        </ul>
    )
}

export default VehicleList

// props + list rendering + key