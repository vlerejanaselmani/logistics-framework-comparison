# Backend Implementations

Each backend exposes the same vehicle API shape:

```text
GET    /api/vehicles
GET    /api/vehicles/{id}
POST   /api/vehicles
PUT    /api/vehicles/{id}
DELETE /api/vehicles/{id}
```

Vehicle JSON:

```json
{
  "id": 1,
  "registrationNumber": "TR-001",
  "type": "Truck",
  "capacityKg": 12000,
  "available": true
}
```

## Express

```bash
cd backends/express
npm install
npm run dev
```

Default URL:

```text
http://localhost:3000/api/vehicles
```

## ASP.NET Core

```bash
cd backends/aspnet-core
dotnet run
```

Default URL is shown in the terminal when the app starts.

## Laravel

```bash
cd backends/laravel
composer install
php artisan migrate --seed
php artisan serve
```

Default URL:

```text
http://localhost:8000/api/vehicles
```
