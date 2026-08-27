const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'
const VEHICLES_URL = `${API_BASE_URL}/vehicles`

async function handleJsonResponse(response, errorMessage) {
  if (!response.ok) {
    throw new Error(errorMessage)
  }

  return response.json()
}

async function handleEmptyResponse(response, errorMessage) {
  if (!response.ok) {
    throw new Error(errorMessage)
  }

  return null
}

export function getVehicles() {
  return fetch(VEHICLES_URL).then((response) =>
    handleJsonResponse(response, 'Failed to load vehicles'),
  )
}

export function getVehicleById(id) {
  return fetch(`${VEHICLES_URL}/${id}`).then((response) =>
    handleJsonResponse(response, 'Failed to load vehicle'),
  )
}

export function createVehicle(vehicle) {
  return fetch(VEHICLES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  }).then((response) => handleJsonResponse(response, 'Failed to create vehicle'))
}

export function updateVehicle(id, vehicle) {
  return fetch(`${VEHICLES_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  }).then((response) => handleJsonResponse(response, 'Failed to update vehicle'))
}

export function deleteVehicle(id) {
  return fetch(`${VEHICLES_URL}/${id}`, {
    method: 'DELETE',
  }).then((response) => handleEmptyResponse(response, 'Failed to delete vehicle'))
}
