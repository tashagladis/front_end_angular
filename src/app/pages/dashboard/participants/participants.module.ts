import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ParticipantsComponent } from './participants.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'src/app/components/message/message.module';
import { AvatarModule } from 'src/app/components/avatar/avatar.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';


const routes: Routes = 
[
    {
      path: '',
      component: ParticipantsComponent,
    }
];

@NgModule({
  declarations: [
    ParticipantsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MessageModule,
    AvatarModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    CommonModule

  ],
  providers: []
})
export class ParticipantsModule { }