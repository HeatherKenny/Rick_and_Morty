import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },
  {
    path: '',
    loadComponent: () => import('./layouts/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'characters',
        loadComponent: () => import('./features/characters/characters.component').then(m => m.CharactersComponent)
      },
      {
        path: 'characters/:id',
        loadComponent: () => import('./features/characters/character-details.component').then(m => m.CharacterDetailsComponent)
      },
      {
        path: 'locations',
        loadComponent: () => import('./features/locations/locations.component').then(m => m.LocationsComponent)
      },
      {
        path: 'episodes',
        loadComponent: () => import('./features/episodes/episodes.component').then(m => m.EpisodesComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: '',
        redirectTo: 'characters',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'characters'
  }
];
