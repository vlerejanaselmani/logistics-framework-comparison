import { useState } from 'react'

function VehicleForm({ onCreateVehicle }) {
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [type, setType] = useState('')
    const [capacityKg, setCapacityKg] = useState('')
    const [available, setAvailable] = useState(true)

    function handleSubmit(event) {
        event.preventDefault()
        
        onCreateVehicle({
            registrationNumber,
            type,
            capacityKg: Number(capacityKg),
            available
        })

        setRegistrationNumber('')
    setType('')
    setCapacityKg('')
    setAvailable(true)
  }

        
    return (
        <form onSubmit={handleSubmit}>
            <input
                value={registrationNumber}
                onChange={(event) => setRegistrationNumber(event.target.value)}
                placeholder="Registration Number"
            />

            <input
                value={type}
                onChange={(event) => setType(event.target.value)}
                placeholder="Vehicle Type"
            />

            <input
                value={capacityKg}
                onChange={(event) => setCapacityKg(event.target.value)}
                typ="number"
            />

            <label>
                <input
                    value={available}
                    onChange={(event) => setAvailable(event.target.checked)}
                    type="checkbox"
                />
                Availability
            </label>

            <button type="submit">Add vehicle</button>
        </form>
    )
}

export default VehicleForm
