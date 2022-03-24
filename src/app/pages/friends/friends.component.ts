import { Component, OnInit } from '@angular/core';
import { FriendsService } from './friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})



export class FriendsComponent implements OnInit {
  invitList: any[] = [];
  error: string = "";

  constructor(private _friends: FriendsService) { }

  ngOnInit(): void {
    this._friends.getInvitations()
    .subscribe(
          data => {
              this.invitList = data[0].invitations;
          },
          error => {
              this.error = error.error;
          },
      );
  }

  

}
