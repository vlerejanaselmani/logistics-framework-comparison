import VehicleList  from "../components/VehicleList";
import VehicleForm from "../components/VehicleForm";
import { useVehicleContext } from '../context/VehicleContext'
import { useCallback, useMemo, useState } from "react";
import VehicleFilters from '../components/VehicleFilters'

function VehiclesPage() {
    const {vehicles, loading, error, createVehicle} = useVehicleContext()
    const [filter, setFilter] = useState('all')

    const handleFilterChange = useCallback((nextFilter) => {
        setFilter(nextFilter)
    }, [])

    const filteredVehicles = useMemo(() => {
        if (filter === 'all') {
            return vehicles
        }

        const availability = filter === 'available'

        return vehicles.filter((vehicle) => vehicle.available === availability)
        }, [vehicles, filter])

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
            <VehicleFilters filter = {filter} onFilterChange={handleFilterChange} />
            <VehicleList vehicles={filteredVehicles} />
        </main>
    )
}

export default VehiclesPage

//component composition