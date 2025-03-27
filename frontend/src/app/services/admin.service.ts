import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskDelGiorno } from '../models/TaskDelGiorno';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin'; // URL del backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  /** Ottiene tutte le task del giorno */
  getAllTasksDelGiorno(): Observable<TaskDelGiorno[]> {
    const headers = this.createAuthorizationHeaders();
    return this.http.get<TaskDelGiorno[]>(`${this.apiUrl}/tasks-del-giorno`, { headers });
  }

  /** Aggiunge una nuova task del giorno */
  addTaskDelGiorno(task: TaskDelGiorno): Observable<void> {
    const headers = this.createAuthorizationHeaders();
    return this.http.post<void>(`${this.apiUrl}/tasks-del-giorno`, task, { headers });
  }

  /** Elimina una task del giorno per ID */
  deleteTaskDelGiorno(id: number): Observable<void> {
    const headers = this.createAuthorizationHeaders();
    return this.http.delete<void>(`${this.apiUrl}/tasks-del-giorno/${id}`, { headers });
  }

  /** Crea l'intestazione di autorizzazione con il Bearer Token */
  private createAuthorizationHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Ottieni il token dal servizio di autenticazione
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
