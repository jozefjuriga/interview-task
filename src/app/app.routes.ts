import { Route } from '@angular/router';
import { StepGuard } from './guard/step.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/pick-date/pick-date.component').then((m) => m.PickDateComponent),
    data: { step: 1 }
  },
  {
    path: 'personal-data',
    loadComponent: () =>
      import('./components/person-data/person-data.component').then((m) => m.PersonDataComponent),
    canActivate: [StepGuard],
    data: { step: 2 }

  },
  {
    path: 'reservation-details',
    loadComponent: () =>
      import('./components/reservation-summary/reservation-summary.component').then((m) => m.ReservationSummaryComponent),
    canActivate: [StepGuard],
    data: { step: 3 }
  },
  {
    path: 'thank-you',
    loadComponent: () =>
      import('./components/thank-you/thank-you.component').then((m) => m.ThankYouComponent),
    canActivate: [StepGuard],
    data: { step: 4 }
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./components/error/error.component').then((m) => m.ErrorComponent),
    canActivate: [StepGuard],
    data: { step: 4 }
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
