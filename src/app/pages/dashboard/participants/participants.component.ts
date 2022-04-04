import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParticipantsService } from './participants.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  error: string = "";
  userList: any[] = [];

  constructor(private route: ActivatedRoute, 
    private _participantsService: ParticipantsService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const EventIdFromRoute = Number(routeParams.get('eventId'));

    this._participantsService.getUsersEvent(EventIdFromRoute)
    .subscribe(
          data => {  
            this.userList = data[0].participants;         
            console.log()
          },
          error => {
              this.error = error.error;
          },
      );
  }


}
