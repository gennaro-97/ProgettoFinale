import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  private apiUrl = 'http://###.com/api/users';
  private loginUrl = 'http://###.com/api/login';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUsersById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/{id}`);
  }

  login(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password,
    };

    return this.http.post<any>(this.loginUrl, body); // POST per il login
  }
}
