import { useEffect, useState } from "react";
import VehiclesPage from "./pages/VehiclesPage";
import './App.css';

function App(){
  const [vehicles, setVehicles] = useState([])
  const[loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetch('http://localhost:8080/api/vehicles')
    .then((response) => {
      if(!response.ok){
        throw new Error('Failed to fetch vehicles')
      }

      return response.json()
    })
    .then((data)=> {
      setVehicles(data)
      setLoading(false)
    })
    .catch((error)=> {
      setError(error.message)
      setLoading(false)
    })
  }, [])

  function handleCreateVehicle(vehicle) {
    fetch('http://localhost:8080/api/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    })
      .then((response)=>{
        if(!response.ok) {
          throw new Error('Failed to create VEHICLE')
        }
        return response.json()
      })
      .then((savedVehicle)=> {
        setVehicles((currentVehicles) => [...currentVehicles, savedVehicle])
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  if (loading){
    return <p>Loading vehicles...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  return (
  <VehiclesPage 
            vehicles={vehicles} 
            onCreateVehicle={handleCreateVehicle}
  />
  )
}

export default App