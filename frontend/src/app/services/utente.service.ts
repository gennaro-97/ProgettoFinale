import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from '../models/Utente';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UtenteService {
  private apiUrl = 'http://localhost:8080/api/Utente'; // URL del backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Recupera gli headers con il token JWT per l'autenticazione
   */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Aggiunge l'header di autenticazione
    });
  }

  /**
   * Ottiene un utente tramite il suo ID.
   * @param id ID dell'utente.
   * @returns Un Observable con i dati dell'utente.
   */
  getUtente(id: number): Observable<Utente> {
    return this.http.get<Utente>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
