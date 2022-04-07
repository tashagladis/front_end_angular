import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from './event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  
  form!: FormGroup;
  error: string = "";
  errorMessage = '';

  @ViewChild('UploadFileInput')uploadFileInput!: ElementRef;
  myfilename = 'Select Image';
  imgBase64Path : string = "";
  type : string = "";
   defauftimag = "data:image/jpeg;base64,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"
  
  constructor(private _eventService: EventService,
    private _router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.required])),
      zipcode: new FormControl('', Validators.compose([Validators.required,  Validators.pattern('[0-9]{5}')])),
      city: new FormControl('', Validators.compose([Validators.required])),
      date: new FormControl('', Validators.compose([Validators.required])),
      hour: new FormControl('', Validators.compose([Validators.required]))
  });
  }


  submit(): void {
    if (!this.form.valid) {
        return;
    }

    let params: any = {
      Title: this.form.value.title,
      Address: this.form.value.address,
      Zipcode: this.form.value.zipcode,
      City: this.form.value.city,
      EventDate: this.form.value.date,
      Hour: this.form.value.hour,
      ImageBasePath: this.imgBase64Path != ''? this.imgBase64Path.toString(): this.defauftimag,
      ImageType: this.type
    };
  
    this._eventService.createEvent(params)
        .then((val) => {
          this._router.navigateByUrl("dashboard/events")      
         })
        .catch((err) => {
            this.error = err.error.message;
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
        console.log(this.imgBase64Path)

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
