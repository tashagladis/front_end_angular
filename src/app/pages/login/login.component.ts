import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/login/login.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form!: FormGroup;
    error: string = "";

    constructor(
        private _router: Router,
        private _loginService: LoginService
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            login: new FormControl('', Validators.compose([Validators.required])),
            password: new FormControl('', Validators.compose([Validators.required])),

        });
      }

   
    

    submit(): void {
        // if (!this.form.valid) {
        //     return;
        // }

        // let params: any = {
        //   Login: this.form.value.login,
        //   Password: this.form.value.password
        // };
      

        // this._loginService.doLogin(params)
        //     .then((val) => {
        //       console.log("Ok")
                this._router.navigateByUrl("/map")
                    .finally(() => { });
            // }).catch((err) => {
            //     this.error = err.error.message;
            // });
    }

}
