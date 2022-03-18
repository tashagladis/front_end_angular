import { Component, OnInit } from '@angular/core';
import { SidebarleftService } from './sidebar-left.service';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent implements OnInit {
  
  userList: any[] = [];
  error: string = "";

  constructor(private _sidebar: SidebarleftService) { }

 

  ngOnInit(): void {
    this._sidebar.getUsers()
    .subscribe(
          data => {
              this.userList = data;
              console.log(this.userList)
          },
          error => {
              this.error = error.error;
          },
      );

  }

}
