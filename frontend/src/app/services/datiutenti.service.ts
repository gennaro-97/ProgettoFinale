import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatiUtente } from '../models/DatiUtente';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DatiutentiService {
  private apiUrl = 'http://localhost:8080/api/datiUtente';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Ottieni il token da AuthService
    console.log(token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Aggiungi l'header di autorizzazione
    });
  }

  /**
 * Verifica se l'utente è al suo primo login.
 * @param utenteId ID dell'utente.
 * @returns Un Observable con la risposta boolean di checkFirstLogin.
 */
  checkFirstLogin(utenteId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/firstLogin/${utenteId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Salva i dati dell'utente.
   * @param datiUtente Oggetto contenente i dati dell'utente.
   * @returns Un Observable con i dati salvati.
   */
  saveDatiUtente(datiUtente: DatiUtente): Observable<DatiUtente> {
    return this.http.post<DatiUtente>(`${this.apiUrl}`, datiUtente, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Aggiorna i dati dell'utente.
   * @param utenteId ID dell'utente da aggiornare.
   * @param peso Nuovo peso dell'utente.
   * @param altezza Nuova altezza dell'utente.
   * @returns Un Observable con i dati aggiornati.
   */
  aggiornaDatiUtente(
    utenteId: number,
    peso: number,
    altezza: number
  ): Observable<DatiUtente> {
    return this.http.put<DatiUtente>(
      `${this.apiUrl}/${utenteId}/aggiorna?peso=${peso}&altezza=${altezza}`,
      {},
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  /**
   * Ottiene i dati dell'utente tramite il suo ID.
   * @param utenteId ID dell'utente.
   * @returns Un Observable con i dati dell'utente.
   */
  getDatiUtente(utenteId: number): Observable<DatiUtente> {
    return this.http.get<DatiUtente>(`${this.apiUrl}/${utenteId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}