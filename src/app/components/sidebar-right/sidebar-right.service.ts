import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidebarrightService implements Resolve<any>{

    messageOfUser: Subject<any>;
    onListUsersUpdated: Subject<any>;

    constructor( 
        private _httpClient: HttpClient) {
        this.onListUsersUpdated = new Subject();
        this.messageOfUser = new Subject();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getMe()
            ]).then(
                ([datas]: [any]) => {
                    resolve(datas);
                },
                reject
            );
        });
    }

  

    
    getMe(): Observable<any> {
        return this._httpClient.get(`http://localhost:55697/api/user/mydatas`);
    }

}