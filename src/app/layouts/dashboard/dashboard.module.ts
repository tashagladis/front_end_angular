import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarLeftComponent } from 'src/app/components/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from 'src/app/components/sidebar-right/sidebar-right.component';



@NgModule({
  declarations: [
    DashboardComponent ,
    SidebarLeftComponent,
    SidebarRightComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DashboardComponent 
  ],
  providers: []
})
export class DashboardModule { }