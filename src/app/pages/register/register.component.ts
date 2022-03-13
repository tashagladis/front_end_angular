import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  error: string = "";

  constructor(
      private _router: Router,
      private _registerService: RegisterService
  ) { }

  ngOnInit(): void {
      this.form = new FormGroup({
        firstname: new FormControl('', Validators.compose([Validators.required])),
        lastname: new FormControl('', Validators.compose([])),
        gender: new FormControl('', Validators.compose([])),
        email: new FormControl('', Validators.compose([Validators.required])),
        phone: new FormControl('', Validators.compose([Validators.required])),
        login: new FormControl('', Validators.compose([Validators.required])),
        address: new FormControl('', Validators.compose([Validators.required])),
        zipcode: new FormControl('', Validators.compose([Validators.required])),
        city: new FormControl('', Validators.compose([Validators.required])),
        password: new FormControl('', Validators.compose([Validators.required])),
        password2: new FormControl('', Validators.compose([Validators.required])),

      });
    }

 
  

  submit(): void {
      if (!this.form.valid) {
          return;
      }

      let params: any = {
        Login: this.form.value.login,
        Password: this.form.value.password,
        Firstname: this.form.value.firstname,
        Lastname:this.form.value.lastname,
        Genre: this.form.value.genre,
        Email: this.form.value.email,
        Phone: this.form.value.phone,
        Address: this.form.value.address,
        Zipcode: this.form.value.zipcode,
        City: this.form.value.city
      };
    

      this._registerService.doRegister(params)
          .then((val) => {
            console.log("Ok")
              this._router.navigateByUrl("dashboard")
                  .finally(() => { });
          }).catch((err) => {
              this.error = err.error.message;
              console.log(err)
          });
  }
}
