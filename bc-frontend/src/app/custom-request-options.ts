import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from './auth';
import { Router } from '@angular/router';

@Injectable()
export class CustomRequestOptions implements HttpInterceptor {
  constructor(
    private router: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let clonedRequest = req.clone();

    if (!req.headers.has('Authorization')) {
      const token = localStorage.getItem('token');
      clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Basic ${btoa(`${token}:`)}`)
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError((err: HttpErrorResponse, caught: Observable<HttpEvent<any>>) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(caught);
      })
    );
  }
}
