<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Services\VehicleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function __construct(private readonly VehicleService $vehicleService)
    {
    }

    public function index(): JsonResponse
    {
        return response()->json(
            $this->vehicleService
                ->getAllVehicles()
                ->map(fn (Vehicle $vehicle): array => $this->toResponse($vehicle)),
        );
    }

    public function show(Vehicle $vehicle): JsonResponse
    {
        return response()->json($this->toResponse($vehicle));
    }

    public function store(Request $request): JsonResponse
    {
        $validatedData = $this->validateVehicle($request);
        $vehicle = $this->vehicleService->addVehicle($this->toPersistenceData($validatedData));

        return response()->json($this->toResponse($vehicle), 201);
    }

    public function update(Request $request, Vehicle $vehicle): JsonResponse
    {
        $validatedData = $this->validateVehicle($request);
        $updatedVehicle = $this->vehicleService->updateVehicle(
            $vehicle,
            $this->toPersistenceData($validatedData),
        );

        return response()->json($this->toResponse($updatedVehicle));
    }

    public function destroy(Vehicle $vehicle): JsonResponse
    {
        $this->vehicleService->removeVehicle($vehicle);

        return response()->json(null, 204);
    }

    private function validateVehicle(Request $request): array
    {
        return $request->validate([
            'registrationNumber' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'capacityKg' => ['required', 'numeric', 'gt:0'],
            'available' => ['required', 'boolean'],
        ]);
    }

    private function toPersistenceData(array $validatedData): array
    {
        return [
            'registration_number' => $validatedData['registrationNumber'],
            'type' => $validatedData['type'],
            'capacity_kg' => $validatedData['capacityKg'],
            'available' => $validatedData['available'],
        ];
    }

    private function toResponse(Vehicle $vehicle): array
    {
        return [
            'id' => $vehicle->id,
            'registrationNumber' => $vehicle->registration_number,
            'type' => $vehicle->type,
            'capacityKg' => $vehicle->capacity_kg,
            'available' => $vehicle->available,
        ];
    }
}
