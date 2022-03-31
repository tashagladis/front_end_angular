import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class EventService implements Resolve<any> {

    private _authenticated: boolean = false;

    constructor(
        private _httpClient: HttpClient
    ) {
    }

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
    createEvent(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`http://localhost:55697/api/event`, params)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

}
