import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Component/auth/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let request: any;
    let currentUser: any;
    let isloggedIn: boolean;
    this._authService.isloggedIn$.subscribe((res) => {
      isloggedIn = res;

      if (isloggedIn) {
        this._authService.currentUser$.subscribe((res) => {
          currentUser = res;

          request = req.clone({
            setHeaders: {
             ' Authorization': `Bearer ${currentUser.token}`
            }
          });
        });
      }
    });

    return next.handle(request ? request : req);
  }
}
