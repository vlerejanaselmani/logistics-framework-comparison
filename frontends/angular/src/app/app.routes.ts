import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'vehicles',
  },
  {
    path: 'vehicles',
    loadComponent: () =>
      import('./features/vehicles/pages/vehicles-page.component').then(
        (m) => m.VehiclesPageComponent,
      ),
  },
  {
    path: 'vehicles/:id',
    loadComponent: () =>
      import('./features/vehicles/pages/vehicle-details-page.component').then(
        (m) => m.VehicleDetailsPageComponent,
      ),
  },
];