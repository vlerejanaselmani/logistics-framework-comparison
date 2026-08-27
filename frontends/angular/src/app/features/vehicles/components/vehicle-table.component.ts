import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Vehicle } from '../models/vehicle.model';

@Component({
  selector: 'app-vehicle-table',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="table-shell">
      <table>
        <thead>
          <tr>
            <th>Registration</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Available</th>
            <th class="actions-column">Actions</th>
          </tr>
        </thead>

        <tbody>
          @if (vehicles.length === 0) {
            <tr>
              <td class="empty-cell" colspan="5">No vehicles found.</td>
            </tr>
          }

          @for (vehicle of vehicles; track vehicle.id) {
            <tr>
              <td>
                <a [routerLink]="['/vehicles', vehicle.id]">
                  {{ vehicle.registrationNumber }}
                </a>
              </td>
              <td>{{ vehicle.type }}</td>
              <td>{{ vehicle.capacityKg }} kg</td>
              <td>
                <span class="status-pill" [class.unavailable]="!vehicle.available">
                  {{ vehicle.available ? 'Yes' : 'No' }}
                </span>
              </td>
              <td class="actions-cell">
                <button type="button" (click)="editVehicle.emit(vehicle)">Edit</button>
                <button type="button" class="danger-button" (click)="deleteVehicle.emit(vehicle.id)">
                  Delete
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .table-shell {
        background: #fffaf1;
        border: 2px solid #b7112d;
        border-radius: 18px;
        box-shadow: 0 18px 55px rgba(117, 16, 31, 0.14);
        overflow: hidden;
      }

      table {
        border-collapse: collapse;
        width: 100%;
      }

      th {
        background: linear-gradient(135deg, #7a0d20, #d21f3c);
        color: #fffaf1;
        font-size: 0.78rem;
        letter-spacing: 0.04em;
        padding: 14px;
        text-align: left;
        text-transform: uppercase;
      }

      td {
        border-top: 1px solid #e8a5ad;
        color: #42151b;
        padding: 14px;
      }

      a {
        color: #8f1027;
        font-weight: 800;
        text-decoration: none;
      }

      .actions-column,
      .actions-cell {
        text-align: right;
      }

      .actions-cell {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }

      button {
        background: #fff0ed;
        border: 1px solid #df8d96;
        border-radius: 999px;
        color: #8f1027;
        cursor: pointer;
        font: inherit;
        font-size: 0.86rem;
        font-weight: 800;
        padding: 8px 12px;
      }

      .danger-button {
        background: #8f1027;
        border-color: #8f1027;
        color: #fffaf1;
      }

      .status-pill {
        background: #f6d9cd;
        border-radius: 999px;
        color: #67111e;
        display: inline-flex;
        font-size: 0.8rem;
        font-weight: 900;
        padding: 5px 10px;
      }

      .status-pill.unavailable {
        background: #f2e2dc;
        color: #85616a;
      }

      .empty-cell {
        color: #8b5962;
        font-weight: 700;
        text-align: center;
      }

      @media (max-width: 760px) {
        .table-shell {
          overflow-x: auto;
        }

        table {
          min-width: 720px;
        }
      }
    `,
  ],
})
export class VehicleTableComponent {
  @Input({ required: true }) vehicles: Vehicle[] = [];
  @Output() editVehicle = new EventEmitter<Vehicle>();
  @Output() deleteVehicle = new EventEmitter<number>();
}