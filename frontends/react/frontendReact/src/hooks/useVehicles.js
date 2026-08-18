import { useEffect, useState } from "react";

const API_URL = 'http://localhost:8080/api/vehicles'

function useVehicles() {
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(API_URL)
           .then((response) => {
            if(!response.ok) {
                throw new Error('Error : failed to load vehicles!')
            }

            return response.json()
           })
           .then((data)=> {
            setVehicles(data)
            setLoading(false)
           })
           .catch((error)=>{
            setError(error.message)
            setLoading(false)
           })

          }  ,[])

    function createVehicle(vehicle) {
        return fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicle),
        })
          .then((response)=>{
            if(!response.ok) {
                throw new Error('failed to create vehicle because' + Error.body)
            }

            return response.json()
          })
          .then((savedVehicle) => {
            setVehicles((currentVehicle) => [...currentVehicle, savedVehicle])
          })
          .catch((error)=> {
            setError(error.message)
          })
    }

    return {
        vehicles,
        loading,
        error,
        createVehicle
    }

}

export default useVehicles