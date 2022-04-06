import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { SidebarleftService } from 'src/app/components/sidebar-left/sidebar-left.service';
import { TchatService } from './tchat.service';
import 'rxjs/add/operator/timeout'

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.scss']
})
export class TchatComponent implements OnInit {
  USER_KEY = 'tchat-user';
  selectedUser:any;
  messageList: any[] = [];
  messages: any = {};
  error: string = "";
  tchatservice : any;
  demandsend: boolean = false;
  private _unsubscribeAll: Subject<any>;
  form!: FormGroup; 

  constructor(
    private _tchatservice: TchatService,
     private _sidebar: SidebarleftService) {
      this._unsubscribeAll = new Subject();

      }

  ngOnInit(): void {

    this.form = new FormGroup({
        message: new FormControl('', Validators.compose([])),
    });

    this.selectedUser = this.getUser();
    this._sidebar.onListUsersUpdated
    .pipe(takeUntil(this._unsubscribeAll), delay(5))
    .subscribe(data  => {  
      this.selectedUser = data;
    });

      this._sidebar.demand
      .pipe(takeUntil(this._unsubscribeAll), delay(5))
      .subscribe(data => {
        this.demandsend = data
        console.log(this.demandsend)
      });


    this._sidebar.messageOfUser
    .pipe(takeUntil(this._unsubscribeAll), delay(50))
    .subscribe(datas => {
      this.initMessage(datas);
    });
  
    
  }
  

  initMessage(data: any) {

        this.messages[this.selectedUser] = [];
    data.forEach((element: any) => {
      if(element.Sender == this.selectedUser){
       
        this.messages[this.selectedUser].push({ type: 'in', message: element.Text, sender: element.Sender  });
      }else{
      
        this.messages[this.selectedUser].push({ type: 'out', message: element.Text, sender: "me"});
      }
        
    });
}


sendMessage() {
  let formData = this.form.getRawValue();
  let params: any = {
    Text: formData.message
  };

  
  this._tchatservice.sendMessage(this.selectedUser, params)
      .then(value => {
          if (!this.messages[this.selectedUser]) {
              this.messages[this.selectedUser] = [];
          }
         
          this.messages[this.selectedUser].push({ type: 'out', message: formData.message });
      }).catch((err: { error: string; }) => {
          this.error = err.error;
         
      }).finally(() => {
          this.form.reset();
      });
}

sendInvitation() {
  
  this._tchatservice.sendInvitaion(this.selectedUser)
      .then(value => {
        window.location.reload()      
      }).catch((err: { error: string; }) => {
          this.error = err.error;
         
      });
}

public getUser() {
  return JSON.parse(sessionStorage.getItem("tchat-user") || '{}');
}
  

}
