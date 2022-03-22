import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/login/login.service';
import { TokenStorageService } from './token-storage.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form!: FormGroup;
    error: string = "";

    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
  

    constructor(
        private _router: Router,
        private _loginService: LoginService,
         private tokenStorage: TokenStorageService
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            login: new FormControl('', Validators.compose([Validators.required])),
            password: new FormControl('', Validators.compose([Validators.required])),

        });

        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
          }
      }

   
    

    submit(): void {
        if (!this.form.valid) {
            return;
        }

        let params: any = {
          Login: this.form.value.login,
          Password: this.form.value.password
        };
      
        this._loginService.doLogin(params)
            .then((val) => {
              this.tokenStorage.saveToken(val.token)
                this.tokenStorage.saveUser(val)
                this.isLoginFailed = false
                this.isLoggedIn = true
                this._router.navigateByUrl("dashboard")
                

            .finally(() => { });
             })
            .catch((err) => {
                this.error = err.error.message;
            });
    }

}
