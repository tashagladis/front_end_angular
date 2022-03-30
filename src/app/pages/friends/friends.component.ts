import { Component, OnInit } from '@angular/core';
import { FriendsService } from './friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})



export class FriendsComponent implements OnInit {
  friendList: any[] = [];
  error: string = "";

  constructor(private _friends: FriendsService) { }

  ngOnInit(): void {
    this._friends.getFriends()
    .subscribe(
          data => {
              this.friendList = data[0].friends;
             console.log(this.friendList)
          },
          error => {
              this.error = error.error;
          },
      );
  }

  

}
