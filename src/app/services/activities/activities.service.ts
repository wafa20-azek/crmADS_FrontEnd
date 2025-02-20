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
    return this.http.get<Activity[]>(`${this.apiUrl}/getall`,{ withCredentials: true });
  }
  getActivityById(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiUrl}/getbyid/${id}`,{ withCredentials: true });
  }
  getActivityByContactId(id: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/getByContact/${id}`,{ withCredentials: true });
  }
  addActivity(formData:FormData): Observable<Activity> {
    return this.http.post<Activity>(`${this.apiUrl}/addActivity`, formData,{ withCredentials: true });
  }
  deleteActivityById(id: number): Observable<any> {
    return this.http.delete<Activity>(`${this.apiUrl}/deleteActivity/${id}`,{ withCredentials: true });
  }
  updateActivity(activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.apiUrl}/updateActivity`, activity,{ withCredentials: true });
  }
}