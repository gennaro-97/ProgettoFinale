import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskDelGiorno } from '../models/TaskDelGiorno';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskDelGiornoService {
  private apiUrl = 'http://localhost:8080/api/tasksdelgiorno'; // URL del backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  /** Metodo per ottenere l'header con il token di autenticazione */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  /** Ottiene tutte le task del giorno per una data specifica */
  getTasksByDate(data: string): Observable<TaskDelGiorno[]> {
    const params = new HttpParams().set('data', data);
    const headers = this.getAuthHeaders();
    return this.http.get<TaskDelGiorno[]>(`${this.apiUrl}/by-date`, { headers, params });
  }
}
