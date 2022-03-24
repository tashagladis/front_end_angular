import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './register.service';
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



const routes = [
    {
        path: '',
        component: RegisterComponent
    }
];

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatRadioModule,
        MatStepperModule,
        MatToolbarModule,
        FormsModule
    ],
    
  exports: [
    RegisterComponent
  ],
  providers: [
    RegisterService
    ]
})
export class RegisterModule { }