<?php

namespace App\Repositories;

use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Collection;

class VehicleRepository
{
    public function findAll(): Collection
    {
        return Vehicle::query()->orderBy('id')->get();
    }

    public function findById(int $id): ?Vehicle
    {
        return Vehicle::query()->find($id);
    }

    public function create(array $data): Vehicle
    {
        return Vehicle::query()->create($data);
    }

    public function update(Vehicle $vehicle, array $data): Vehicle
    {
        $vehicle->update($data);

        return $vehicle->fresh();
    }

    public function delete(Vehicle $vehicle): void
    {
        $vehicle->delete();
    }
}
