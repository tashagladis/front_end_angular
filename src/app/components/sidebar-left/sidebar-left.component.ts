import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent implements OnInit {

  constructor() { }

   menus = [
    { id:1,link: "/", title: "Home"},
    { id:2,link: "/", title: "Projects" },
    { id:3,link: "/", title: "Billing" },
    { id:4,link: "/", title: "Team members" }
  ]

  ngOnInit(): void {
  }

}
