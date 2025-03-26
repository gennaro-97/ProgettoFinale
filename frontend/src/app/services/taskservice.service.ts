import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks'; // URL del backend

  constructor(private http: HttpClient) {}

  /** Ottiene tutte le task di un utente */
  getTasksByUtente(utenteId: number): Observable<Task[]> {
    const params = new HttpParams().set('utenteId', utenteId.toString());
    return this.http.get<Task[]>(this.apiUrl, { params });
  }

  /** Crea una nuova task */
  createTask(task: Task): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}`, task);
  }

  /** Elimina una task per ID */
  deleteTask(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  /** Imposta una task come risolta o non risolta */
  setTaskResolved(id: number, resolved: boolean): Observable<string> {
    const params = new HttpParams().set('resolved', resolved.toString());
    return this.http.put<string>(`${this.apiUrl}/${id}/resolve`, null, { params });
  }

  /** Ottiene tutte le task risolte di un utente */
  getResolvedTasks(utenteId: number): Observable<Task[]> {
    const params = new HttpParams().set('utenteId', utenteId.toString());
    return this.http.get<Task[]>(`${this.apiUrl}/resolved`, { params });
  }

  /** Ottiene tutte le task non risolte di un utente */
  getUnresolvedTasks(utenteId: number): Observable<Task[]> {
    const params = new HttpParams().set('utenteId', utenteId.toString());
    return this.http.get<Task[]>(`${this.apiUrl}/unresolved`, { params });
  }
}

