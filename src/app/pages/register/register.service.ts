import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private _authenticated: boolean = false;

    constructor(
        private _httpClient: HttpClient
    ) {
    }

    get user(): any {
        return JSON.parse(localStorage.getItem("userSelected") || "[]");
    }

    doRegister(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`http://localhost:55697/api/authentification/register`, params)
                .subscribe((response: any) => {
                    localStorage.setItem('userSelected', JSON.stringify(response));
                    console.log(response);
                    resolve(response);
                }, reject);
        });
    }

}
