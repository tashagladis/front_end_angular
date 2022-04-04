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
        loadChildren: () => import('./pages/empty/login/login.module').then(m => m.LoginModule)
      },
      {
        path: "register",
        loadChildren: () => import('./pages/empty/register/register.module').then(m => m.RegisterModule)
      }
    ]
  },
  { path: "dashboard", pathMatch: 'full', redirectTo: 'dashboard/map' },
  {
    path: "dashboard",
    component: DashboardComponent ,
    children: [
      {
        path: "map",
        loadChildren: () => import('./components/map/map.module').then(m => m.MapModule)
      },
      {
        path: "tchat",
        loadChildren: () => import('./pages/dashboard/tchat/tchat.module').then(m => m.TchatModule)
      },
      {
        path: "friends",
        loadChildren: () => import('./pages/dashboard/friends/friends.module').then(m => m.FriendsModule)
      },
      {
        path: "demands",
        loadChildren: () => import('./pages/dashboard/demands/demands.module').then(m => m.DemandsModule)
      },
      {
        path: "event",
        loadChildren: () => import('./pages/dashboard/event/event.module').then(m => m.EventModule)
      },
      {
        path: "events",
        loadChildren: () => import('./pages/dashboard/events/events.module').then(m => m.EventsModule)
      },
      {
        path: "profil/:userName",
        loadChildren: () => import('./pages/dashboard/profil/profil.module').then(m => m.ProfileModule)
      },
      {
        path: "participants/:eventId",
        loadChildren: () => import('./pages/dashboard/participants/participants.module').then(m => m.ParticipantsModule)
      },
    ]
  },

  { path: '**', redirectTo: 'dashboard/map' },


];