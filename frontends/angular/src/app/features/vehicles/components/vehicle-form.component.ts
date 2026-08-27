import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Vehicle, VehicleRequest } from '../models/vehicle.model';

const emptyVehicleForm: VehicleRequest = {
  registrationNumber: '',
  type: '',
  capacityKg: 0,
  available: true,
};

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="vehicle-form" (ngSubmit)="submit()">
      <div class="form-header">
        <h2>{{ vehicleToEdit ? 'Update vehicle' : 'Add vehicle' }}</h2>
        <button type="button" class="ghost-button" (click)="reset()" [disabled]="!vehicleToEdit">
          Clear
        </button>
      </div>

      <label>
        Registration number
        <input
          name="registrationNumber"
          type="text"
          required
          [(ngModel)]="formData.registrationNumber"
          placeholder="TR-001"
        />
      </label>

      <label>
        Type
        <input
          name="type"
          type="text"
          required
          [(ngModel)]="formData.type"
          placeholder="Truck"
        />
      </label>

      <label>
        Capacity kg
        <input
          name="capacityKg"
          type="number"
          min="0"
          required
          [(ngModel)]="formData.capacityKg"
        />
      </label>

      <label class="checkbox-row">
        <input name="available" type="checkbox" [(ngModel)]="formData.available" />
        Available
      </label>

      <button class="primary-button" type="submit">
        {{ vehicleToEdit ? 'Save changes' : 'Create vehicle' }}
      </button>
    </form>
  `,
  styles: [
    `
      .vehicle-form {
        background: #fffaf1;
        border: 1px solid #f1c9c9;
        border-radius: 18px;
        box-shadow: 0 18px 50px rgba(117, 16, 31, 0.12);
        display: grid;
        gap: 16px;
        padding: 22px;
      }

      .form-header {
        align-items: center;
        display: flex;
        justify-content: space-between;
        gap: 12px;
      }

      h2 {
        color: #71111e;
        font-size: 1.1rem;
        margin: 0;
      }

      label {
        color: #5b2830;
        display: grid;
        font-size: 0.9rem;
        font-weight: 700;
        gap: 7px;
      }

      input {
        background: #fffdf8;
        border: 1px solid #df8d96;
        border-radius: 12px;
        color: #371014;
        font: inherit;
        padding: 11px 12px;
      }

      input:focus {
        border-color: #b7112d;
        box-shadow: 0 0 0 3px rgba(183, 17, 45, 0.15);
        outline: none;
      }

      .checkbox-row {
        align-items: center;
        display: flex;
        gap: 10px;
      }

      .checkbox-row input {
        height: 18px;
        width: 18px;
      }

      button {
        border: 0;
        border-radius: 999px;
        cursor: pointer;
        font: inherit;
        font-weight: 800;
        padding: 11px 16px;
      }

      .primary-button {
        background: linear-gradient(135deg, #8f1027, #d21f3c);
        color: #fffaf1;
      }

      .ghost-button {
        background: #fff0ed;
        color: #8f1027;
      }

      .ghost-button:disabled {
        cursor: not-allowed;
        opacity: 0.45;
      }
    `,
  ],
})
export class VehicleFormComponent implements OnChanges {
  @Input() vehicleToEdit: Vehicle | null = null;
  @Output() saveVehicle = new EventEmitter<VehicleRequest>();

  formData: VehicleRequest = { ...emptyVehicleForm };

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['vehicleToEdit']) {
      return;
    }

    this.formData = this.vehicleToEdit
      ? {
          registrationNumber: this.vehicleToEdit.registrationNumber,
          type: this.vehicleToEdit.type,
          capacityKg: this.vehicleToEdit.capacityKg,
          available: this.vehicleToEdit.available,
        }
      : { ...emptyVehicleForm };
  }

  submit(): void {
    this.saveVehicle.emit({
      ...this.formData,
      capacityKg: Number(this.formData.capacityKg),
    });

    this.reset();
  }

  reset(): void {
    this.vehicleToEdit = null;
    this.formData = { ...emptyVehicleForm };
  }
}