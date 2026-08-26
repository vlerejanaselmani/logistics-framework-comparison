import VehicleTable  from "../components/VehicleTable";
import VehicleForm from "../components/VehicleForm";
import { useVehicleContext } from '../context/VehicleContext'
import { useCallback, useMemo, useState } from "react";
import VehicleFilters from '../components/VehicleFilters'

function VehiclesPage() {
    const {vehicles, loading, error, createVehicle, updateVehicle, deleteVehicle} = useVehicleContext()
    const [editingVehicle, setEditingVehicle] = useState(null)
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

    function handleSubmitVehicle(vehicle) {
        if (editingVehicle) {
            updateVehicle(editingVehicle.id, vehicle)
            setEditingVehicle(null)
            return
    }

  createVehicle(vehicle)
    }

    if (loading) {
        return <p>Loading vehicles...</p>
    }

    return (
        <main className="app-page">
            <section className="page-header">
                <h1>Vehicles</h1>
                <p>Manage logistics fleet records</p>
            </section>

            {error && <p className="error-message">{error}</p>}

            <VehicleForm
            vehicleToEdit={editingVehicle}
        onCreateVehicle={handleSubmitVehicle}
        />

        <VehicleFilters filter={filter} onFilterChange={handleFilterChange} />

        <VehicleTable
        vehicles={filteredVehicles}
        onDeleteVehicle={deleteVehicle}
        onEditVehicle={setEditingVehicle}
        />
    </main>
    )
}

export default VehiclesPage

//component composition
