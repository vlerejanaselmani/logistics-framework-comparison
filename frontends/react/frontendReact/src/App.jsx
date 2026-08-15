import { useEffect, useState } from "react";
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

  if (loading){
    return <p>Loading vehicles...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  return (
    <main>
      <h1>
        Vehicles
      </h1>
      {vehicles.length === 0 ?(
        <p>No vehicles found.</p>
      ) : (
        <ul>
          {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            {vehicle.registrationNumber} - {vehicle.type} - {vehicle.capacityKg} kg
            </li>
           ))} 
        </ul>
      )}
    </main>
  )

}

export default App