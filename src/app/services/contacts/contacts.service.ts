import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private apiUrl = 'http://localhost:8081/crm/contact';
  constructor(private http: HttpClient) {}
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/getall`);
  }
  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/getbyid/${id}`);
  }
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/addContact`, contact);
  }
  deleteContactById(id: number): Observable<any> {
    return this.http.delete<Contact>(`${this.apiUrl}/deleteContact/${id}`);
  }
  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/updateContact`, contact);
  }
}
