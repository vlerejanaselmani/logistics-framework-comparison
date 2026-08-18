import useVehicles from './hooks/useVehicles'
import VehiclesPage from "./pages/VehiclesPage";
import './App.css';

function App(){
  const {vehicles, loading, error, createVehicle } = useVehicles()

    if (loading){
      return <p>Loading vehicles...</p>
    }
    if (error) {
      return <p>{error}</p>
    }

    return (
      <VehiclesPage 
          vehicles={vehicles} 
          onCreateVehicle={createVehicle}
      />
  )
}

export default App