import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks'; // URL del backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Ottieni il token da AuthService
    console.log(token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Aggiungi l'header di autorizzazione
    });
  }

  /** Ottiene tutte le task di un utente */
  getTasksByUtente(utenteId: number): Observable<Task[]> {
    const params = new HttpParams().set('utenteId', utenteId.toString());
    const headers = this.getAuthHeaders(); // Aggiungi l'header Authorization
    return this.http.get<Task[]>(this.apiUrl, { headers, params });
  }

  /** Crea una nuova task */
  createTask(task: Task): Observable<string> {
    const headers = this.getAuthHeaders(); // Aggiungi l'header Authorization
    return this.http.post<string>(`${this.apiUrl}`, task, { headers });
  }

  /** Elimina una task per ID */
  deleteTask(id: number): Observable<string> {
    const headers = this.getAuthHeaders(); // Aggiungi l'header Authorization
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { headers });
  }

  /** Imposta una task come risolta o non risolta */
  setTaskResolved(id: number, resolved: boolean): Observable<string> {
    const params = new HttpParams().set('resolved', resolved.toString());
    const headers = this.getAuthHeaders(); // Aggiungi l'header Authorization
    return this.http.put<string>(`${this.apiUrl}/${id}/resolve`, null, { headers, params });
  }

  /** Ottiene tutte le task risolte di un utente */
  // getResolvedTasks(utenteId: number): Observable<Task[]> {
  //   const params = new HttpParams().set('utenteId', utenteId.toString());
  //   const headers = this.getAuthHeaders(); // Aggiungi l'header Authorization
  //   return this.http.get<Task[]>(`${this.apiUrl}/resolved`, { headers, params });
  // }

  /** Ottiene tutte le task non risolte di un utente */
  // getUnresolvedTasks(utenteId: number): Observable<Task[]> {
  //   const params = new HttpParams().set('utenteId', utenteId.toString());
  //   const headers = this.getAuthHeaders(); // Aggiungi l'header Authorization
  //   return this.http.get<Task[]>(`${this.apiUrl}/unresolved`, { headers, params });
  // }
}



