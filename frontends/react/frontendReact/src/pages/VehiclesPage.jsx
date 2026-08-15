import VehicleList  from "../components/VehicleList";

function VehiclesPage({ vehicles }) {
    return (
        <main>
            <h1>Vehicles</h1>
            <VehicleList vehicles={vehicles} />
        </main>
    )
}

export default VehiclesPage

//component composition