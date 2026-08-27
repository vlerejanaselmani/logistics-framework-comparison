using LogisticsAspNetCore.Models;

namespace LogisticsAspNetCore.Services;

public interface IVehicleService
{
    IReadOnlyList<Vehicle> GetAllVehicles();
    Vehicle? GetVehicleById(long id);
    Vehicle AddVehicle(Vehicle vehicle);
    Vehicle? UpdateVehicle(long id, Vehicle vehicle);
    bool RemoveVehicleById(long id);
}
