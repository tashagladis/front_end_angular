import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs/observable';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: TokenStorageService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
}
}