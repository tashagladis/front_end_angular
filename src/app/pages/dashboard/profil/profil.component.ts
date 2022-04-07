import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilService } from './profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  User!: any ;
  error: string = "";
  eventList: any[] = [];

  constructor(private route: ActivatedRoute, private _router: Router,
    private _profilService: ProfilService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userNameFromRoute = routeParams.get('userName') || '';

    this._profilService.getYourDatas(userNameFromRoute)
    .subscribe(
          data => {
              this.User = data[0];
          },
          error => {
              this.error = error.error;
          },
      );

      this._profilService.getYourEvents(userNameFromRoute)
      .subscribe(
            data => {
              this.eventList = data;
            },
            error => {
                this.error = error.error;
            },
        );
    
  }

  addUser(eventId: any) {
  
    this._profilService.addToEvent(eventId)
        .then(value => {
          const url = "dashboard/participants/"+eventId;

          this._router.navigateByUrl(url)        
        }).catch((err: { error: string; }) => {
            this.error = err.error;
           
        });
  }

}
