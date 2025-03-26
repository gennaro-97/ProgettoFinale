import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Utente } from '../models/Utente';
import { AuthRequest } from '../models/responses/AuthRequest';
import { AuthResponse } from '../models/responses/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // URL del backend

  constructor(private http: HttpClient) {}

  /**
   * Registra un nuovo utente
   */
  register(utente: Utente): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, utente).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Effettua il login e salva il token e il ruolo nel localStorage
   */
  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, authRequest).pipe(
      tap(response => {
        this.saveToken(response.token);
        this.saveUserRole(response.ruolo);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Salva il token JWT nel localStorage
   */
  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Ottiene il token JWT dal localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Salva il ruolo dell'utente nel localStorage
   */
  private saveUserRole(role: string): void {
    localStorage.setItem('role', role);
  }

  /**
   * Ottiene il ruolo dell'utente
   */
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  /**
   * Cancella il token e il ruolo dal localStorage per effettuare il logout
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  /**
   * Controlla se l'utente è autenticato
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Gestisce errori HTTP
   */
  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Si è verificato un errore';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Errore client: ${error.error.message}`;
    } else {
      errorMsg = `Errore server: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }
}
