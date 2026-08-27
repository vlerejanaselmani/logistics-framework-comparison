using LogisticsAspNetCore.Models;

namespace LogisticsAspNetCore.Repositories;

public class InMemoryVehicleRepository : IVehicleRepository
{
    private readonly List<Vehicle> _vehicles =
    [
        new()
        {
            Id = 1,
            RegistrationNumber = "TR-001",
            Type = "Truck",
            CapacityKg = 12000,
            Available = true
        },
        new()
        {
            Id = 2,
            RegistrationNumber = "VN-204",
            Type = "Van",
            CapacityKg = 1800,
            Available = false
        }
    ];

    private long _nextId = 3;

    public IReadOnlyList<Vehicle> FindAll()
    {
        return _vehicles;
    }

    public Vehicle? FindById(long id)
    {
        return _vehicles.FirstOrDefault(vehicle => vehicle.Id == id);
    }

    public Vehicle Create(Vehicle vehicle)
    {
        vehicle.Id = _nextId++;
        _vehicles.Add(vehicle);
        return vehicle;
    }

    public Vehicle? Update(long id, Vehicle vehicle)
    {
        var existingVehicle = FindById(id);

        if (existingVehicle is null)
        {
            return null;
        }

        existingVehicle.RegistrationNumber = vehicle.RegistrationNumber;
        existingVehicle.Type = vehicle.Type;
        existingVehicle.CapacityKg = vehicle.CapacityKg;
        existingVehicle.Available = vehicle.Available;

        return existingVehicle;
    }

    public bool DeleteById(long id)
    {
        var vehicle = FindById(id);

        if (vehicle is null)
        {
            return false;
        }

        return _vehicles.Remove(vehicle);
    }
}
