import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, timeout } from 'rxjs';

import { API_BASE_URL } from '../../../core/api.config';
import { Vehicle, VehicleRequest } from '../models/vehicle.model';

@Injectable({
    providedIn: 'root',
})
export class VehicleService {
    private readonly http = inject(HttpClient);
    private readonly vehiclesUrl = `${API_BASE_URL}/vehicles`;

    getVehicles(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(this.vehiclesUrl).pipe(timeout(3000));
    }

    getVehicleById(id: number): Observable<Vehicle> {
        return this.http.get<Vehicle>(`${this.vehiclesUrl}/${id}`);
    }
    
    createVehicle(vehicle: VehicleRequest): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.vehiclesUrl, vehicle);
  }

  updateVehicle(id: number, vehicle: VehicleRequest): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.vehiclesUrl}/${id}`, vehicle);
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.vehiclesUrl}/${id}`);
  }


}
