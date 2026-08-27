<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [
        'registration_number',
        'type',
        'capacity_kg',
        'available',
    ];

    protected $casts = [
        'capacity_kg' => 'float',
        'available' => 'boolean',
    ];
}
