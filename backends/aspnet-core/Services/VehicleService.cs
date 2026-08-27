using LogisticsAspNetCore.Models;
using LogisticsAspNetCore.Repositories;

namespace LogisticsAspNetCore.Services;

public class VehicleService(IVehicleRepository vehicleRepository) : IVehicleService
{
    public IReadOnlyList<Vehicle> GetAllVehicles()
    {
        return vehicleRepository.FindAll();
    }

    public Vehicle? GetVehicleById(long id)
    {
        return vehicleRepository.FindById(id);
    }

    public Vehicle AddVehicle(Vehicle vehicle)
    {
        return vehicleRepository.Create(vehicle);
    }

    public Vehicle? UpdateVehicle(long id, Vehicle vehicle)
    {
        return vehicleRepository.Update(id, vehicle);
    }

    public bool RemoveVehicleById(long id)
    {
        return vehicleRepository.DeleteById(id);
    }
}
