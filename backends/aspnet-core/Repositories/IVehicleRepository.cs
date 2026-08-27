using LogisticsAspNetCore.Models;

namespace LogisticsAspNetCore.Repositories;

public interface IVehicleRepository
{
    IReadOnlyList<Vehicle> FindAll();
    Vehicle? FindById(long id);
    Vehicle Create(Vehicle vehicle);
    Vehicle? Update(long id, Vehicle vehicle);
    bool DeleteById(long id);
}
