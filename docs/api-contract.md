````md
# REST API Contract

## 1. General Conventions

Base URL:

```text
/api
````

The API exchanges data using JSON.

```http
Content-Type: application/json
```

## 2. HTTP Status Codes

| Code                        | Meaning                           |
| --------------------------- | --------------------------------- |
| `200 OK`                    | Request completed successfully    |
| `201 Created`               | Resource created successfully     |
| `204 No Content`            | Resource deleted successfully     |
| `400 Bad Request`           | Invalid request data              |
| `404 Not Found`             | Requested resource does not exist |
| `409 Conflict`              | Request violates a business rule  |
| `500 Internal Server Error` | Unexpected server error           |

## 3. Customer Endpoints

| Method   | Endpoint              | Description       |
| -------- | --------------------- | ----------------- |
| `GET`    | `/api/customers`      | Get all customers |
| `GET`    | `/api/customers/{id}` | Get one customer  |
| `POST`   | `/api/customers`      | Create a customer |
| `PUT`    | `/api/customers/{id}` | Update a customer |
| `DELETE` | `/api/customers/{id}` | Delete a customer |

### Customer Request

```json
{
  "name": "Example Customer",
  "email": "customer@example.com",
  "phone": "+38344111222",
  "address": "Example address"
}
```

## 4. Driver Endpoints

| Method   | Endpoint            | Description     |
| -------- | ------------------- | --------------- |
| `GET`    | `/api/drivers`      | Get all drivers |
| `GET`    | `/api/drivers/{id}` | Get one driver  |
| `POST`   | `/api/drivers`      | Create a driver |
| `PUT`    | `/api/drivers/{id}` | Update a driver |
| `DELETE` | `/api/drivers/{id}` | Delete a driver |

### Driver Request

```json
{
  "firstName": "Arben",
  "lastName": "Krasniqi",
  "licenseNumber": "DL-123456",
  "phone": "+38344123456",
  "active": true
}
```

## 5. Vehicle Endpoints

| Method   | Endpoint             | Description      |
| -------- | -------------------- | ---------------- |
| `GET`    | `/api/vehicles`      | Get all vehicles |
| `GET`    | `/api/vehicles/{id}` | Get one vehicle  |
| `POST`   | `/api/vehicles`      | Create a vehicle |
| `PUT`    | `/api/vehicles/{id}` | Update a vehicle |
| `DELETE` | `/api/vehicles/{id}` | Delete a vehicle |

### Vehicle Request

```json
{
  "registrationNumber": "01-123-AB",
  "type": "TRUCK",
  "capacityKg": 5000,
  "available": true
}
```

## 6. Shipment Endpoints

| Method   | Endpoint                         | Description                 |
| -------- | -------------------------------- | --------------------------- |
| `GET`    | `/api/shipments`                 | Get all shipments           |
| `GET`    | `/api/shipments/{id}`            | Get one shipment            |
| `POST`   | `/api/shipments`                 | Create a shipment           |
| `PUT`    | `/api/shipments/{id}`            | Update a shipment           |
| `DELETE` | `/api/shipments/{id}`            | Delete a shipment           |
| `PATCH`  | `/api/shipments/{id}/status`     | Update shipment status      |
| `PATCH`  | `/api/shipments/{id}/assignment` | Assign a driver and vehicle |

### Shipment Request

```json
{
  "trackingNumber": "SHIP-2026-0001",
  "origin": "Pristina",
  "destination": "Tirana",
  "weightKg": 250,
  "customerId": 1
}
```

### Status Update Request

```json
{
  "status": "IN_TRANSIT"
}
```

### Assignment Request

```json
{
  "driverId": 1,
  "vehicleId": 1
}
```

## 7. Error Response

All backend implementations should use a consistent error format:

```json
{
  "status": 404,
  "message": "Shipment with ID 10 was not found",
  "timestamp": "2026-07-26T20:30:00Z"
}
```
