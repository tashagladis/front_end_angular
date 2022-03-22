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
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data  => {  
      this.selectedUser = data;
    });

    this._sidebar.messageOfUser
    .pipe(takeUntil(this._unsubscribeAll), delay(50))
    .subscribe(datas => {
      this.initMessage(datas);
      console.log(this.messages[this.selectedUser])
    });
    
  }

  initMessage(data: any) {

        this.messages[this.selectedUser] = [];
        console.log(data)
    data.forEach((element: any) => {
      console.log(this.selectedUser+" "+element.Sender)
      if(element.Sender.toLowerCase( ) == this.selectedUser){
       
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
  console.log(params)
  
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

public getUser() {
  return JSON.parse(sessionStorage.getItem("tchat-user") || '{}');
}
  

}
