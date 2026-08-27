using System.ComponentModel.DataAnnotations;

namespace LogisticsAspNetCore.Models;

public class Vehicle
{
    public long Id { get; set; }

    [Required]
    public string RegistrationNumber { get; set; } = string.Empty;

    [Required]
    public string Type { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue)]
    public double CapacityKg { get; set; }

    public bool Available { get; set; }
}
