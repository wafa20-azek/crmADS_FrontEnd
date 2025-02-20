import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/crm/auth';
  constructor(private http: HttpClient) {}
  login(user:User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, user,{ withCredentials: true });
  }
  register(user:User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user,{ withCredentials: true });
  }
  logOut():  Observable<any>  {
    return this.http.post(`${this.apiUrl}/logout`,{},{ withCredentials: true });
  }
}
