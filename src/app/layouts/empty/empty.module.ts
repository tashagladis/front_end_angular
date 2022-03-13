import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './empty.component';
import { LoginModule } from 'src/app/pages/login/login.module';
import { RegisterModule } from 'src/app/pages/register/register.module';



@NgModule({
  declarations: [
    EmptyComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    LoginModule,
    RegisterModule 
  ],
  exports: [
      EmptyComponent
  ],
  providers: []
})
export class EmptyModule { }