import VehicleList  from "../components/VehicleList";
import VehicleForm from "../components/VehicleForm";
import { useVehicleContext } from '../context/VehicleContext'

function VehiclesPage() {
    const {vehicles, loading, error, createVehicle} = useVehicleContext()

    if (loading) {
        return <p>Loading vehicles...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <main>
            <h1>Vehicles</h1>
            <VehicleForm onCreateVehicle={createVehicle}/>
            <VehicleList vehicles={vehicles} />
        </main>
    )
}

export default VehiclesPage

//component composition