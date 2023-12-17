import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      retry(3),
      map((res) => {
        if (res instanceof HttpResponse) {
          return res;
        }
        return null;
      }),
      catchError((err: HttpErrorResponse) => {
        let errMsg = '';
        if (err.error instanceof ErrorEvent) {
          //Client Side Error
          let errMsg = `Error : ${err.message}`;
        } else {
          errMsg = `Error message : ${err.message}  Error Status: ${err.status}`;
        }
        return throwError(() => Error(errMsg))
      })
    );
  }
}
