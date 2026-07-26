# Database Design

## 1. Overview

The system uses a relational SQL database.

It contains four main tables:

- `customers`
- `drivers`
- `vehicles`
- `shipments`

## 2. Relationships

- One customer can have many shipments.
- Each shipment belongs to one customer.
- One driver can be assigned to many shipments over time.
- One vehicle can be assigned to many shipments over time.
- A shipment may have one assigned driver.
- A shipment may have one assigned vehicle.

## 3. Customers Table

| Column | Type | Constraints |
|---|---|---|
| `id` | BIGINT | Primary key, auto-generated |
| `name` | VARCHAR(100) | Not null |
| `email` | VARCHAR(150) | Not null, unique |
| `phone` | VARCHAR(30) | Not null |
| `address` | VARCHAR(255) | Not null |

## 4. Drivers Table

| Column | Type | Constraints |
|---|---|---|
| `id` | BIGINT | Primary key, auto-generated |
| `first_name` | VARCHAR(100) | Not null |
| `last_name` | VARCHAR(100) | Not null |
| `license_number` | VARCHAR(100) | Not null, unique |
| `phone` | VARCHAR(30) | Not null |
| `active` | BOOLEAN | Not null, default true |

## 5. Vehicles Table

| Column | Type | Constraints |
|---|---|---|
| `id` | BIGINT | Primary key, auto-generated |
| `registration_number` | VARCHAR(50) | Not null, unique |
| `type` | VARCHAR(50) | Not null |
| `capacity_kg` | DECIMAL(10,2) | Not null |
| `available` | BOOLEAN | Not null, default true |

## 6. Shipments Table

| Column | Type | Constraints |
|---|---|---|
| `id` | BIGINT | Primary key, auto-generated |
| `tracking_number` | VARCHAR(100) | Not null, unique |
| `origin` | VARCHAR(255) | Not null |
| `destination` | VARCHAR(255) | Not null |
| `weight_kg` | DECIMAL(10,2) | Not null |
| `status` | VARCHAR(30) | Not null |
| `customer_id` | BIGINT | Not null, foreign key |
| `driver_id` | BIGINT | Nullable, foreign key |
| `vehicle_id` | BIGINT | Nullable, foreign key |
| `created_at` | TIMESTAMP | Not null |
| `updated_at` | TIMESTAMP | Not null |

## 7. Foreign Keys

| Child column | References |
|---|---|
| `shipments.customer_id` | `customers.id` |
| `shipments.driver_id` | `drivers.id` |
| `shipments.vehicle_id` | `vehicles.id` |

## 8. Entity Relationship Diagram

```mermaid
erDiagram
    CUSTOMER ||--o{ SHIPMENT : places
    DRIVER o|--o{ SHIPMENT : delivers
    VEHICLE o|--o{ SHIPMENT : transports

    CUSTOMER {
        bigint id PK
        varchar name
        varchar email UK
        varchar phone
        varchar address
    }

    DRIVER {
        bigint id PK
        varchar first_name
        varchar last_name
        varchar license_number UK
        varchar phone
        boolean active
    }

    VEHICLE {
        bigint id PK
        varchar registration_number UK
        varchar type
        decimal capacity_kg
        boolean available
    }

    SHIPMENT {
        bigint id PK
        varchar tracking_number UK
        varchar origin
        varchar destination
        decimal weight_kg
        varchar status
        bigint customer_id FK
        bigint driver_id FK
        bigint vehicle_id FK
        timestamp created_at
        timestamp updated_at
    }