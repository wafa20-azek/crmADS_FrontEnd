import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.clearJwtCookie();
          this.router.navigate(['/auth']); 
        }
        throw error; 
      })
    );
  }
  private clearJwtCookie(): void {
    document.cookie = 'JWT=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // Clears the cookie
  }
}
