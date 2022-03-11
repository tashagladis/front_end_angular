import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MapComponent } from './map.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps'

const routes: Routes = [
    {
      path: '',
      component: MapComponent,
    }
  ];

@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GoogleMapsModule
  ],
  providers: []
})
export class MapModule { }
