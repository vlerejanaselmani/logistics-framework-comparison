using LogisticsAspNetCore.Models;
using LogisticsAspNetCore.Services;
using Microsoft.AspNetCore.Mvc;

namespace LogisticsAspNetCore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VehiclesController(IVehicleService vehicleService) : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyList<Vehicle>> GetVehicles()
    {
        return Ok(vehicleService.GetAllVehicles());
    }

    [HttpGet("{id:long}")]
    public ActionResult<Vehicle> GetVehicleById(long id)
    {
        var vehicle = vehicleService.GetVehicleById(id);

        if (vehicle is null)
        {
            return NotFound();
        }

        return Ok(vehicle);
    }

    [HttpPost]
    public ActionResult<Vehicle> AddVehicle(Vehicle vehicle)
    {
        var savedVehicle = vehicleService.AddVehicle(vehicle);
        return CreatedAtAction(nameof(GetVehicleById), new { id = savedVehicle.Id }, savedVehicle);
    }

    [HttpPut("{id:long}")]
    public ActionResult<Vehicle> UpdateVehicle(long id, Vehicle vehicle)
    {
        var updatedVehicle = vehicleService.UpdateVehicle(id, vehicle);

        if (updatedVehicle is null)
        {
            return NotFound();
        }

        return Ok(updatedVehicle);
    }

    [HttpDelete("{id:long}")]
    public IActionResult DeleteVehicle(long id)
    {
        var deleted = vehicleService.RemoveVehicleById(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
