import { Component, OnInit, inject } from '@angular/core';

import { VehicleFormComponent } from '../components/vehicle-form.component';
import { VehicleTableComponent } from '../components/vehicle-table.component';
import { Vehicle, VehicleRequest } from '../models/vehicle.model';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicles-page',
  standalone: true,
  imports: [VehicleFormComponent, VehicleTableComponent],
  template: `
    <main class="vehicles-page">
      <section class="page-header">
        <div>
          <p class="eyebrow">Logistics fleet</p>
          <h1>Vehicles</h1>
        </div>

        <div class="summary-pill">
          {{ filteredVehicles.length }} shown / {{ vehicles.length }} total
        </div>
      </section>

      @if (errorMessage) {
        <p class="error-message">{{ errorMessage }}</p>
      }

      <section class="content-grid">
        <app-vehicle-form
          [vehicleToEdit]="editingVehicle"
          (saveVehicle)="handleSaveVehicle($event)"
        />

        <section class="table-area">
          <div class="filters">
            <button type="button" [class.active]="filter === 'all'" (click)="filter = 'all'">
              All
            </button>
            <button
              type="button"
              [class.active]="filter === 'available'"
              (click)="filter = 'available'"
            >
              Available
            </button>
            <button
              type="button"
              [class.active]="filter === 'unavailable'"
              (click)="filter = 'unavailable'"
            >
              Unavailable
            </button>
          </div>

          @if (isLoading) {
            <p class="loading-message">Loading vehicles...</p>
          } @else {
            <app-vehicle-table
              [vehicles]="filteredVehicles"
              (editVehicle)="startEditing($event)"
              (deleteVehicle)="handleDeleteVehicle($event)"
            />
          }
        </section>
      </section>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100dvh;
        background:
          radial-gradient(circle at top left, rgba(210, 31, 60, 0.09), transparent 32rem),
          #fff8ee;
        color: #371014;
        font-family:
          Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      .vehicles-page {
        margin: 0 auto;
        max-width: 1160px;
        padding: 36px 20px 48px;
      }

      .page-header {
        align-items: end;
        display: flex;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 22px;
      }

      .eyebrow {
        color: #b7112d;
        font-size: 0.78rem;
        font-weight: 900;
        letter-spacing: 0.12em;
        margin: 0 0 8px;
        text-transform: uppercase;
      }

      h1 {
        color: #5d101b;
        font-size: clamp(2.2rem, 6vw, 4.2rem);
        line-height: 1;
        margin: 0;
      }

      .summary-pill {
        background: #fffaf1;
        border: 1px solid #df8d96;
        border-radius: 999px;
        color: #8f1027;
        font-weight: 900;
        padding: 10px 14px;
        white-space: nowrap;
      }

      .error-message,
      .loading-message {
        background: #fff0ed;
        border: 1px solid #df8d96;
        border-radius: 14px;
        color: #8f1027;
        font-weight: 800;
        margin: 0 0 18px;
        padding: 12px 14px;
      }

      .content-grid {
        align-items: start;
        display: grid;
        gap: 22px;
        grid-template-columns: minmax(260px, 340px) 1fr;
      }

      .table-area {
        display: grid;
        gap: 14px;
      }

      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .filters button {
        background: #fffaf1;
        border: 1px solid #df8d96;
        border-radius: 999px;
        color: #8f1027;
        cursor: pointer;
        font: inherit;
        font-weight: 900;
        padding: 9px 14px;
      }

      .filters button.active {
        background: #8f1027;
        border-color: #8f1027;
        color: #fffaf1;
      }

      @media (max-width: 900px) {
        .content-grid,
        .page-header {
          grid-template-columns: 1fr;
        }

        .content-grid {
          display: grid;
        }

        .page-header {
          align-items: start;
          flex-direction: column;
        }
      }
    `,
  ],
})
export class VehiclesPageComponent implements OnInit {
  private readonly vehicleService = inject(VehicleService);

  vehicles: Vehicle[] = [];
  editingVehicle: Vehicle | null = null;
  filter: 'all' | 'available' | 'unavailable' = 'all';
  isLoading = true;
  errorMessage = '';

  get filteredVehicles(): Vehicle[] {
    if (this.filter === 'available') {
      return this.vehicles.filter((vehicle) => vehicle.available);
    }

    if (this.filter === 'unavailable') {
      return this.vehicles.filter((vehicle) => !vehicle.available);
    }

    return this.vehicles;
  }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.isLoading = false;
      },
      error: () => {
        this.vehicles = [];
        this.errorMessage = 'Backend is not reachable. Showing an empty fleet table.';
        this.isLoading = false;
      },
    });
  }

  handleSaveVehicle(vehicle: VehicleRequest): void {
    if (this.editingVehicle) {
      this.vehicleService.updateVehicle(this.editingVehicle.id, vehicle).subscribe({
        next: (updatedVehicle) => {
          this.vehicles = this.vehicles.map((currentVehicle) =>
            currentVehicle.id === updatedVehicle.id ? updatedVehicle : currentVehicle,
          );
          this.editingVehicle = null;
        },
        error: () => {
          this.errorMessage = 'Vehicle update failed.';
        },
      });

      return;
    }

    this.vehicleService.createVehicle(vehicle).subscribe({
      next: (createdVehicle) => {
        this.vehicles = [...this.vehicles, createdVehicle];
      },
      error: () => {
        this.errorMessage = 'Vehicle creation failed.';
      },
    });
  }

  startEditing(vehicle: Vehicle): void {
    this.editingVehicle = vehicle;
  }

  handleDeleteVehicle(id: number): void {
    this.vehicleService.deleteVehicle(id).subscribe({
      next: () => {
        this.vehicles = this.vehicles.filter((vehicle) => vehicle.id !== id);
      },
      error: () => {
        this.errorMessage = 'Vehicle deletion failed.';
      },
    });
  }
}
