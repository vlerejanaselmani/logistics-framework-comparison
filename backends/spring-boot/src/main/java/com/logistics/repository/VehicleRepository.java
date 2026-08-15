package com.logistics.repository;

import com.logistics.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByAvailable(boolean available);
    List<Vehicle> findByCapacityKg(Double capacity);
    List<Vehicle> findByType(String type);
    Vehicle findByRegistrationNumber(String registrationNumber);


}