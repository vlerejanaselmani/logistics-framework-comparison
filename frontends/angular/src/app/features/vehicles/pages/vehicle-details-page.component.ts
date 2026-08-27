import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Vehicle } from '../models/vehicle.model';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-details-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="details-page">
      <a class="back-link" routerLink="/vehicles">Back to vehicles</a>

      @if (isLoading) {
        <p class="message">Loading vehicle...</p>
      } @else if (errorMessage) {
        <p class="message">{{ errorMessage }}</p>
      } @else if (vehicle) {
        <section class="details-panel">
          <p class="eyebrow">Vehicle profile</p>
          <h1>{{ vehicle.registrationNumber }}</h1>

          <dl>
            <div>
              <dt>Type</dt>
              <dd>{{ vehicle.type }}</dd>
            </div>
            <div>
              <dt>Capacity</dt>
              <dd>{{ vehicle.capacityKg }} kg</dd>
            </div>
            <div>
              <dt>Available</dt>
              <dd>{{ vehicle.available ? 'Yes' : 'No' }}</dd>
            </div>
          </dl>
        </section>
      }
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100dvh;
        background: #fff8ee;
        color: #371014;
        font-family:
          Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      .details-page {
        margin: 0 auto;
        max-width: 760px;
        padding: 40px 20px;
      }

      .back-link {
        color: #8f1027;
        display: inline-flex;
        font-weight: 900;
        margin-bottom: 18px;
        text-decoration: none;
      }

      .details-panel,
      .message {
        background: #fffaf1;
        border: 2px solid #b7112d;
        border-radius: 18px;
        box-shadow: 0 18px 55px rgba(117, 16, 31, 0.14);
        padding: 24px;
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
        font-size: clamp(2rem, 5vw, 3.4rem);
        line-height: 1;
        margin: 0 0 24px;
      }

      dl {
        display: grid;
        gap: 12px;
        margin: 0;
      }

      dl div {
        border-top: 1px solid #e8a5ad;
        display: flex;
        justify-content: space-between;
        gap: 16px;
        padding-top: 12px;
      }

      dt {
        color: #8b5962;
        font-weight: 800;
      }

      dd {
        color: #42151b;
        font-weight: 900;
        margin: 0;
      }
    `,
  ],
})
export class VehicleDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly vehicleService = inject(VehicleService);

  vehicle: Vehicle | null = null;
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage = 'Invalid vehicle id.';
      this.isLoading = false;
      return;
    }

    this.vehicleService.getVehicleById(id).subscribe({
      next: (vehicle) => {
        this.vehicle = vehicle;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Vehicle was not found.';
        this.isLoading = false;
      },
    });
  }
}
