import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from 'src/app/pages/dashboard/events/events.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsService } from './events.service';
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
        component: EventsComponent
    }
];

@NgModule({
    declarations: [
        EventsComponent
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
    EventsComponent
  ],
  providers: [
    EventsService
  ]
})
export class EventsModule { }