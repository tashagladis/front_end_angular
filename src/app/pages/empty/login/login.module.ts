import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/pages/empty/login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes = [
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
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
        MatSlideToggleModule
    ],
    
  exports: [
    LoginComponent
  ],
  providers: [
        LoginService
    ]
})
export class LoginModule { }