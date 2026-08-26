import { useEffect, useState } from 'react'

const initialFormState = {
  registrationNumber: '',
  type: '',
  capacityKg: '',
  available: true,
}

function VehicleForm({ onCreateVehicle, vehicleToEdit }) {
  const [formData, setFormData] = useState(initialFormState)

  useEffect(() => {
    if (vehicleToEdit) {
      setFormData({
        registrationNumber: vehicleToEdit.registrationNumber,
        type: vehicleToEdit.type,
        capacityKg: String(vehicleToEdit.capacityKg),
        available: vehicleToEdit.available,
      })
    }
  }, [vehicleToEdit])

  function handleChange(event) {
    const { name, value, checked, type } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    onCreateVehicle({
      ...formData,
      capacityKg: Number(formData.capacityKg),
    })

    setFormData(initialFormState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="registrationNumber"
        value={formData.registrationNumber}
        onChange={handleChange}
        placeholder="Registration Number"
      />

      <input
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Vehicle Type"
      />

      <input
        name="capacityKg"
        value={formData.capacityKg}
        onChange={handleChange}
        type="number"
        placeholder="Capacity in Kg"
      />

      <label>
        <input
          name="available"
          checked={formData.available}
          onChange={handleChange}
          type="checkbox"
        />
        Availability
      </label>

      <button type="submit">
        {vehicleToEdit ? 'Update vehicle' : 'Add vehicle'}
      </button>
    </form>
  )
}

export default VehicleForm