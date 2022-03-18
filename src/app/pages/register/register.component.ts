import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  error: string = "";
  matcher = new MyErrorStateMatcher();

  constructor(
      private _router: Router,
      private _registerService: RegisterService
  ) { }

 
  ngOnInit(): void {
      this.firstFormGroup = new FormGroup({
        firstname: new FormControl('', Validators.compose([Validators.required])),
        lastname: new FormControl('', Validators.compose([])),
        gender: new FormControl('', Validators.compose([])),
        email: new FormControl('', Validators.compose([Validators.required])),
        phone: new FormControl('', Validators.compose([Validators.required , Validators.pattern('[0-9]{10}')])),
        //, Validators.pattern(("[6-9]\\d{9}"))
      })

      this.secondFormGroup = new FormGroup({
        address: new FormControl('', Validators.compose([Validators.required])),
        zipcode: new FormControl('', Validators.compose([Validators.required,  Validators.pattern('[0-9]{5}')])),
        city: new FormControl('', Validators.compose([Validators.required])),
      })

      this.thirdFormGroup = new FormGroup({ 
        login: new FormControl('', Validators.compose([Validators.required])),
        password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)])),
        password2: new FormControl('', Validators.compose([Validators.required]))
      },
       { validators: this.checkPasswords });
      // https://danielk.tech/home/angular-material-form-validation

    }

    checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
      let pass = group.get('password')?.value;
      let confirmPass = group.get('password2')?.value
      return pass === confirmPass ? null : { notSame: true }
    }
  
 
  

  submit(): void {
      if (!this.firstFormGroup.valid && !this.secondFormGroup.valid && !this.thirdFormGroup.valid) {
          return;
      }

      let params: any = {
        Login: this.thirdFormGroup.value.login,
        Password: this.thirdFormGroup.value.password,
        Firstname: this.firstFormGroup.value.firstname,
        Lastname:this.firstFormGroup.value.lastname,
        Genre: this.firstFormGroup.value.gender == '' ? "Not specified":this.firstFormGroup.value.gender,
        Email: this.firstFormGroup.value.email,
        Phone: this.firstFormGroup.value.phone,
        Address: this.secondFormGroup.value.address,
        Zipcode: this.secondFormGroup.value.zipcode,
        City: this.secondFormGroup.value.city
      };
    
      console.log(params)

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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}
 