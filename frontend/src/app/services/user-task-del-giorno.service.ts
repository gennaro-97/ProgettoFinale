import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UtenteTasksDelGiorno } from '../models/UtenteTasksDelGiorno';

@Injectable({
  providedIn: 'root'
})
export class UserTaskDelGiornoService {
  private apiUrl = 'http://localhost:8080/api/utente-tasks-del-giorno'; // URL del backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  /** Ottiene l'header con il token di autenticazione */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /** Ottiene tutte le task del giorno per un utente specifico */
  getTasksByUtente(utenteId: number): Observable<UtenteTasksDelGiorno[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<UtenteTasksDelGiorno[]>(`${this.apiUrl}/${utenteId}`, { headers });
  }

  /** Assegna una task del giorno a un utente */
  assignTaskToUtente(task: UtenteTasksDelGiorno): Observable<UtenteTasksDelGiorno> {
    const headers = this.getAuthHeaders();
    return this.http.post<UtenteTasksDelGiorno>(this.apiUrl, task, { headers });
  }

  /** Aggiorna lo stato di completamento di una task del giorno */
  updateTaskCompletion(id: number, completata: boolean): Observable<UtenteTasksDelGiorno> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams().set('completata', completata.toString());
    return this.http.put<UtenteTasksDelGiorno>(`${this.apiUrl}/${id}`, null, { headers, params });
  }
}
