import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

@Injectable({
    providedIn: 'root'
})
export class ParticipantsService implements Resolve<any>{

    constructor(
        private _httpClient: HttpClient)
         {}

         resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
            return new Promise((resolve, reject) => {
                Promise.all([
                    this.getUsers()
                ]).then(
                    ([datas]: [any]) => {
                        resolve(datas);
                    },
                    reject
                );
            });
        }


  
    getUsers(): Observable<any> {
        return this._httpClient.get(`http://localhost:55697/api/message/users`);
    }


    getUsersEvent(eventId: number): Observable<any> {
        return this._httpClient.get(`http://localhost:55697/api/event/usersofevent/${eventId}`);
    }

  

}
