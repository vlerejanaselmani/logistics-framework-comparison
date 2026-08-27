import { Link } from 'react-router-dom'

function VehicleTable({ vehicles, onDeleteVehicle, onEditVehicle }) {
  return (
    <div className="table-shell">
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Registration</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-table-cell">
                No vehicles found.
              </td>
            </tr>
          ) : (
            vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>
                  <Link className="table-link" to={`/vehicles/${vehicle.id}`}>
                    {vehicle.registrationNumber}
                  </Link>
                </td>
                <td>{vehicle.type}</td>
                <td>{vehicle.capacityKg} kg</td>
                <td>
                  <span
                    className={
                      vehicle.available
                        ? 'status available'
                        : 'status unavailable'
                    }
                  >
                    {vehicle.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="table-actions">
                  <button type="button" onClick={() => onEditVehicle(vehicle)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteVehicle(vehicle.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default VehicleTable
