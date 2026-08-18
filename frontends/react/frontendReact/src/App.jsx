import { Navigate, Route, Routes} from 'react-router-dom'
import { lazy, Suspense} from 'react'
import './App.css';
import { VehicleProvider } from './context/VehicleContext';

const VehiclesPage = lazy(()=> import ('./pages/VehiclesPage'))
const VehicleDetailsPage = lazy (() => import('./pages/VehicleDetailsPage'))

function App(){
    return (
    <VehicleProvider>  
      <Suspense fallback={<p>Loading page...</p>}>
        <Routes>
          <Route path="/"             element={<Navigate to="/vehicles"/>}                 />
          <Route path="/vehicles"     element={<VehiclesPage/>}                            />
          <Route path="/vehicles/:id" element={<VehicleDetailsPage/>}                      />
        </Routes>
      </Suspense>
  </VehicleProvider>
  )
}

export default App