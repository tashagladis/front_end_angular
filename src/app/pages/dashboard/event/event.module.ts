import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from 'src/app/pages/dashboard/event/event.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from './event.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms'; 

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';




const routes = [
    {
        path: '',
        component: EventComponent
    }
];

@NgModule({
    declarations: [
        EventComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatRadioModule,
        MatStepperModule,
        MatToolbarModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    
  exports: [
    EventComponent
  ],
  providers: [
    EventService
  ]
})
export class EventModule { }