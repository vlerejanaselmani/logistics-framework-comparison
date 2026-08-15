package com.logistics.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.logistics.entity.Vehicle;
import com.logistics.service.VehicleService;


import java.util.List;


@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    private final VehicleService service;

    public VehicleController(VehicleService vehicleService) {
        service = vehicleService;
    }

        @GetMapping
        public List<Vehicle> getVehicles() {
            return service.getAllVehicles();
        }

        @GetMapping("/{id}")
        public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
            Vehicle vehicle = service.getVehicleById(id);

            if (vehicle == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(vehicle);
        }

        @PostMapping
        public ResponseEntity<Vehicle> addVehicle(@RequestBody Vehicle vehicle) {
            Vehicle savedVehicle = service.addVehicle(vehicle);
            return ResponseEntity.status(201).body(savedVehicle);   
        }

        @PutMapping("/{id}")
        public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) {
            Vehicle updatedVehicle = service.updateVehicle(id, vehicle);

            if (updatedVehicle == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(updatedVehicle);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
            service.removeVehicleById(id);
            return ResponseEntity.noContent().build();
        }

}
