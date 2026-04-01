import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { authGuard } from './_guard/auth.guard';

export const routes: Routes = [
  {
     path: '',
    pathMatch: 'full',
    redirectTo:"start/login"
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard/routes').then((m) => m.routes),
      },
      {
        path: 'manager',
        loadChildren: () => import('./pages/manager-food/routes').then((m) => m.routes),
      },
      {
        path: 'list-table',
        loadChildren: () => import('./pages/list-table/routes').then((m) => m.routes),
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/routes').then((m) => m.routes),
      },
      
    ],
  },
  {
        path: 'start/login',
        loadChildren: () => import('./pages/login-page/routes').then((m) => m.routes),
      },
];
