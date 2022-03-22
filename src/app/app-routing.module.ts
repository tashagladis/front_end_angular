import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyComponent } from './layouts/empty/empty.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

export const appRoutes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'login' },
  {
    path: "",
    component: EmptyComponent ,
    children: [
      {
        path: "login",
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
      },
      {
        path: "register",
        loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
      }
    ]
  },
  { path: "dashboard", pathMatch: 'full', redirectTo: 'dashboard/map' },
  {
    path: "dashboard",
    component: DashboardComponent ,
    children: [
      {
        path: "dashboard",
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: "map",
        loadChildren: () => import('./components/map/map.module').then(m => m.MapModule)
      },
      {
        path: "tchat",
        loadChildren: () => import('./pages/tchat/tchat.module').then(m => m.TchatModule)
      }
    ]
  },

  { path: '**', redirectTo: 'dashboard/map' },


];