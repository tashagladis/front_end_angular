import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';

export const appRoutes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'map' },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: "map",
        loadChildren: () => import('./components/map/map.module').then(m => m.MapModule)
      }
    ]
  },

  { path: '**', redirectTo: 'map' },


];