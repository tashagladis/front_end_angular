import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmptyModule } from './empty/empty.module';
import { LoginModule } from '../pages/login/login.module';


@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule ,
    EmptyModule,
    LoginModule 
  ],
  exports: [
    EmptyModule
  ],
  providers: []
})
export class LayoutModule { }