import { Component, OnInit } from '@angular/core';
import { DemandsService } from './demands.service';

@Component({
  selector: 'app-demands',
  templateUrl: './demands.component.html',
  styleUrls: ['./demands.component.scss']
})
export class DemandsComponent implements OnInit {
  invitList: any[] = [];
  error: string = "";

  constructor(private _demands: DemandsService) { }

  ngOnInit(): void {
    this._demands.getInvitations()
    .subscribe(
          data => {
              this.invitList = data[0].invitations;
              console.log("okay")
          },
          error => {
              this.error = error.error;
          },
      );
  }

  acceptInvitation(login: any) {
  
    this._demands.acceptInvitaion(login)
        .then(value => {
          window.location.reload();        
        }).catch((err: { error: string; }) => {
            this.error = err.error;
           
        });
  }

}
