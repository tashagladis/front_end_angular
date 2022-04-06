import { Component, OnInit } from '@angular/core';
import { SidebarleftService } from './sidebar-left.service';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})

export class SidebarLeftComponent implements OnInit {
  
  userList: any[] = [];
  userAll: any[] = [];
  filteredItems: any[] = [];
  userMessages: any[] = [];
  error: string = "";
  searchTerm: string = "";

   USER_KEY = 'tchat-user';
   User: any = null;


  constructor(private _sidebar: SidebarleftService) { }

  ngOnInit(): void {
    this._sidebar.getUsers()
    .subscribe(
          data => {
              this.userList = data;
              this.userAll = this.userList;
              console.log(this.userList)
          },
          error => {
              this.error = error.error;
          },
      );

  }

  selectUser(user: any) {
    this.User = user;
    console.log(this.User)
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this._sidebar.getMessages(user)
    .subscribe(
          data => {
              this.userMessages = data;
              this._sidebar.messageOfUser.next(this.userMessages);
             
          },
          error => {
              this.error = error.error;
          },
      );

      this._sidebar.demandSend(user)
      .subscribe(
            data => {
                this._sidebar.demand.next(data);              
            },
            error => {
                this.error = error.error;
            },
        );
 
      this._sidebar.onListUsersUpdated.next(user);
     
}

search(value: string): void {
    this.userList = this.userAll.filter((val) => val.toLocaleLowerCase().includes(value));
}


}
