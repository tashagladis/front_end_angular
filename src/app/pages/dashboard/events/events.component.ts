import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  eventList: any[] = [];
  error: string = "";
 

  constructor(private _eventService: EventsService) { }

  ngOnInit(): void {
    this._eventService.getEvents()
    .subscribe(
          data => {
              this.eventList = data;
              console.log(this.eventList)
          },
          error => {
              this.error = error.error;
          },
      );
  }

}
