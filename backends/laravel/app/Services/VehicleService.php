<?php

namespace App\Services;

use App\Models\Vehicle;
use App\Repositories\VehicleRepository;
use Illuminate\Database\Eloquent\Collection;

class VehicleService
{
    public function __construct(private readonly VehicleRepository $vehicleRepository)
    {
    }

    public function getAllVehicles(): Collection
    {
        return $this->vehicleRepository->findAll();
    }

    public function getVehicleById(int $id): ?Vehicle
    {
        return $this->vehicleRepository->findById($id);
    }

    public function addVehicle(array $data): Vehicle
    {
        return $this->vehicleRepository->create($data);
    }

    public function updateVehicle(Vehicle $vehicle, array $data): Vehicle
    {
        return $this->vehicleRepository->update($vehicle, $data);
    }

    public function removeVehicle(Vehicle $vehicle): void
    {
        $this->vehicleRepository->delete($vehicle);
    }
}
