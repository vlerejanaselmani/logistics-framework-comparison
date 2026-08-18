import { Navigate, Route, Routes} from 'react-router-dom'
import useVehicles from './hooks/useVehicles'
import VehicleDetailsPage from './pages/VehicleDetailsPage';
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
      <Routes>
        <Route path="/" element={<Navigate to="/vehicles"/>} />
        <Route
          path="/vehicles"
          element={
            <VehiclesPage 
          vehicles={vehicles} 
          onCreateVehicle={createVehicle}
           />
          }
        />
        <Route
          path="/vehicles/:id"
          element={<VehicleDetailsPage vehicles={vehicles} />}
      />
  </Routes>
  )
}

export default App