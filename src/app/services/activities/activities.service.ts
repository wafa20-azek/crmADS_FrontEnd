import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
 private apiUrl = 'http://localhost:8081/crm/activity';
  constructor(private http: HttpClient) {}
  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/getall`);
  }
  getActivityById(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiUrl}/getbyid/${id}`);
  }
  getActivityByContactId(id: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/getByContact/${id}`);
  }
  addActivity(formData:FormData): Observable<Activity> {
    return this.http.post<Activity>(`${this.apiUrl}/addActivity`, formData);
  }
  deleteActivityById(id: number): Observable<any> {
    return this.http.delete<Activity>(`${this.apiUrl}/deleteActivity/${id}`);
  }
  updateActivity(activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.apiUrl}/updateActivity`, activity);
  }
}