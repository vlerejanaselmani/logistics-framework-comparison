import VehicleList  from "../components/VehicleList";
import VehicleForm from "../components/VehicleForm";

function VehiclesPage({ vehicles, onCreateVehicle }) {
    return (
        <main>
            <h1>Vehicles</h1>
            <VehicleForm onCreateVehicle={onCreateVehicle}/>
            <VehicleList vehicles={vehicles} />
        </main>
    )
}

export default VehiclesPage

//component composition