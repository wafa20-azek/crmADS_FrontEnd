import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/crm/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    this.checkJwtAndFetchUser();
  }
  checkJwtAndFetchUser() {
    const jwt = this.getCookie('JWT');
    if (jwt) {
      this.fetchCurrentUser();
    }
  }
  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
  login(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/login`, user, { withCredentials: true })
      .pipe(
        tap(() => {
          this.fetchCurrentUser();
        })
      );
  }
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user, {
      withCredentials: true,
    });
  }
  logOut(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }
  fetchCurrentUser(): void {
    this.http
      .get<User>(`${this.apiUrl}/currentUser`, { withCredentials: true })
      .subscribe(
        (user) => {
          this.currentUserSubject.next(user);
        },
        () => {
          this.currentUserSubject.next(null);
        }
      );
  }
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
