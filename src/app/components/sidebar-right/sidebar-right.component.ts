import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SidebarrightService } from './sidebar-right.service';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent implements OnInit {
  User!: any ;
  error: string = "";

  constructor(private _sidebar: SidebarrightService) { }

  ngOnInit(): void {
    this._sidebar.getMe()
    .subscribe(
          data => {
            this.User = data[0]
             console.log(this.User)
          },
          error => {
              this.error = error.error;
          },
      );
  }

}
