import { Link, useParams } from 'react-router-dom'

function VehicleDetailsPage({ vehicles}) {
    const {id} = useParams()
    
    const vehicle = vehicles.find((vehicle) => vehicle.id === Number(id))

    if(!vehicle) {
        return (            
            <main>
                <p>Vehicle not found!!</p>
                <Link to="/vehicles">Back to vehicles</Link>
            </main>            
            )
        }
     
    return (
        <main>
            <h1>{vehicle.registrationNumber} </h1>
            <p>Type: {vehicle.type}</p>
            <p>Capacity: {vehicle.capacityKg} kg</p>
            <p>Status: {vehicle.available ? 'Available' : 'Unavailable'}</p>
            <Link to="/vehicles"> Back to vehicles </Link>
        </main>
    ) 
        
    }

export default VehicleDetailsPage