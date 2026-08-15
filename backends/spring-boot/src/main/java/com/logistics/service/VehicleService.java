package com.logistics.service;

import org.springframework.stereotype.Service;
import com.logistics.entity.Vehicle;
import java.util.List;
import com.logistics.repository.VehicleRepository;


@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }      

    public Vehicle updateVehicle(Long id, Vehicle vehicle) {
        Vehicle existingVehicle = vehicleRepository.findById(id).orElse(null);

        if (existingVehicle == null) {
            return null;
        }

        existingVehicle.setRegistrationNumber(vehicle.getRegistrationNumber());
        existingVehicle.setType(vehicle.getType());
        existingVehicle.setCapacityKg(vehicle.getCapacityKg());
        existingVehicle.setAvailable(vehicle.isAvailable());

        return vehicleRepository.save(existingVehicle);
    }

    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id).orElse(null);
    }   

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public void removeVehicleById(Long id) {
        vehicleRepository.deleteById(id);
    }
    
}
