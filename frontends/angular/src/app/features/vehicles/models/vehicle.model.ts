export interface Vehicle {
    id:number;
    registrationNumber: string;
    type: string;
    capacityKg: number;
    available: boolean;
}

export type VehicleRequest = Omit<Vehicle, 'id'>;