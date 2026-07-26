# System Requirements

## 1. System Overview

The Logistics Management System is a web application used to manage customers, shipments, drivers, and vehicles.

Its main purpose is to centralize logistics information and make shipment management easier and more reliable.

## 2. User Roles

### Administrator

The administrator can:

- Manage customers
- Manage shipments
- Manage drivers
- Manage vehicles
- Assign drivers and vehicles to shipments
- Update shipment statuses

## 3. Functional Requirements

### Customer Management

- The system shall allow administrators to create a customer.
- The system shall allow administrators to view all customers.
- The system shall allow administrators to update a customer.
- The system shall allow administrators to delete a customer.

### Shipment Management

- The system shall allow administrators to create a shipment.
- The system shall allow administrators to view all shipments.
- The system shall allow administrators to update a shipment.
- The system shall allow administrators to delete a shipment.
- The system shall allow administrators to assign a driver and vehicle to a shipment.
- The system shall allow administrators to update a shipment’s status.

### Driver Management

- The system shall allow administrators to create a driver.
- The system shall allow administrators to view all drivers.
- The system shall allow administrators to update a driver.
- The system shall allow administrators to delete a driver.

### Vehicle Management

- The system shall allow administrators to create a vehicle.
- The system shall allow administrators to view all vehicles.
- The system shall allow administrators to update a vehicle.
- The system shall allow administrators to delete a vehicle.

## 4. Business Rules

- A shipment must belong to an existing customer.
- A shipment may be assigned to one driver and one vehicle.
- A driver cannot be assigned to two active shipments simultaneously.
- A vehicle cannot be assigned to two active shipments simultaneously.
- A shipment status must be one of the following:
  - `PENDING`
  - `IN_TRANSIT`
  - `DELIVERED`
  - `CANCELLED`
- A delivered or cancelled shipment cannot return to an active status.
- A vehicle must be available before it can be assigned to a shipment.
- A driver must be active and available before being assigned.

## 5. Non-Functional Requirements

- The system shall expose functionality through a REST API.
- The system shall validate all submitted data.
- The system shall return appropriate HTTP status codes.
- The system shall provide meaningful error messages.
- The user interface shall be responsive and easy to use.
- Data shall be stored in a relational SQL database.
- The different implementations shall follow the same functional requirements and API contract.

## 6. Scope

### In Scope

- CRUD operations for customers, shipments, drivers, and vehicles
- Driver and vehicle assignment
- Shipment-status management
- Input validation
- Error handling
- SQL data persistence
- REST communication between frontend and backend

### Out of Scope

- Real-time GPS tracking
- Route optimization
- Payment processing
- Customer-facing mobile applications
- Integration with external logistics providers