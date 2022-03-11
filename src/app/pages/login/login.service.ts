import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private _authenticated: boolean = false;

    constructor(
        private _httpClient: HttpClient
    ) {
    }

    get user(): any {
        return JSON.parse(localStorage.getItem("userSelected") || "[]");
    }

    doLogin(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`http://localhost:55697/api/authentification/login`, params)
                .subscribe((response: any) => {
                    localStorage.setItem('userSelected', JSON.stringify(response));
                    console.log(response);
                    resolve(response);
                }, reject);
        });
    }

   /*  signInUsingToken(): Observable<any> {
        return this._httpClient.get(`http://localhost:8000/profile`).pipe(
            catchError((err) => {
                return of(false)
            }),
            switchMap((response: any) => {
                if (!response) {
                    localStorage.removeItem('userSelected');
                    return of(false);
                }
                localStorage.setItem('userSelected', JSON.stringify(response));
                this._authenticated = true;
                return of(true);
            })
        );
    } */

  /*   check(): Observable<boolean> {
        if (this._authenticated) {
            return of(true);
        }
        return true;

       // return this.signInUsingToken();
    } */
}
