import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  imgBase64Path : string = "";
  type : string = "";
  matcher = new MyErrorStateMatcher();

  @ViewChild('UploadFileInput')uploadFileInput!: ElementRef;
  myfilename = 'Select Image';
  defauftimag = "data:image/png;base64,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"


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
        City: this.secondFormGroup.value.city,
        ImageBasePath: this.imgBase64Path != ''? this.imgBase64Path.toString(): this.defauftimag,
        ImageType: this.type
        
      };
    
      console.log(params)

      this._registerService.doRegister(params)
          .then((val) => {
            console.log("Ok")
              this._router.navigateByUrl("")
                  .finally(() => { });
          }).catch((err) => {
              this.error = err.error.message;
              console.log(err)
          });
  }




  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {
      this.myfilename = '';
      Array.from(fileInput.target.files).forEach((file: any) => {
        console.log(file);
        this.myfilename += file.name + ',';
        this.type = file.type
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          // Return Base64 Data URL
          this.imgBase64Path = e.target.result;

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = "";
    } else {
      this.myfilename = 'Select Image';
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}
 