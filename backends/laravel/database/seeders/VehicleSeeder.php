<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        Vehicle::query()->upsert(
            [
                [
                    'registration_number' => 'TR-001',
                    'type' => 'Truck',
                    'capacity_kg' => 12000,
                    'available' => true,
                ],
                [
                    'registration_number' => 'VN-204',
                    'type' => 'Van',
                    'capacity_kg' => 1800,
                    'available' => false,
                ],
            ],
            ['registration_number'],
            ['type', 'capacity_kg', 'available'],
        );
    }
}
