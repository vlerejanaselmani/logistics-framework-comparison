import { Navigate, Route, Routes} from 'react-router-dom'
import VehicleDetailsPage from './pages/VehicleDetailsPage';
import VehiclesPage from "./pages/VehiclesPage";
import './App.css';
import { VehicleProvider } from './context/VehicleContext';

function App(){
    return (
    <VehicleProvider>  
      <Routes>
        <Route path="/"             element={<Navigate to="/vehicles"/>}                 />
        <Route path="/vehicles"     element={<VehiclesPage/>}                            />
        <Route path="/vehicles/:id" element={<VehicleDetailsPage/>}                      />
  </Routes>
  </VehicleProvider>
  )
}

export default App