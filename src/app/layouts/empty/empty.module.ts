import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './empty.component';
import { SidebarLeftComponent } from 'src/app/components/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from 'src/app/components/sidebar-right/sidebar-right.component';


@NgModule({
  declarations: [
    EmptyComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
  ],
  imports: [
    CommonModule,
    RouterModule 
  ],
  exports: [
      EmptyComponent
  ],
  providers: []
})
export class EmptyModule { }