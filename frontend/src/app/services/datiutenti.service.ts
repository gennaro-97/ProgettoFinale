import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatiUtente } from '../models/utentedati.model';

@Injectable({
  providedIn: 'root',
})
export class DatiutentiService {
  private apiUrl = 'http://localhost:8080/api/datiUtente';
  constructor(private http: HttpClient) {}

  saveDatiUtente(datiUtente: DatiUtente): Observable<DatiUtente> {
    return this.http.post<DatiUtente>(`${this.apiUrl}`, datiUtente);
  }

  aggiornaDatiUtente(
    utenteId: number,
    nuovoPeso: number,
    nuovaAltezza: number
  ): Observable<DatiUtente> {
    const datiUtente: DatiUtente = {
      peso: nuovoPeso,
      altezza: nuovaAltezza,
      ibm: this.calcolaIbm(nuovoPeso, nuovaAltezza),
      idUtente: utenteId,
    };
    return this.http.put<DatiUtente>(
      `${this.apiUrl}/aggiorna/${utenteId}`,
      datiUtente
    );
  }

  // Metodo per ottenere i dati dell'utente tramite il suo ID
  getDatiUtente(utenteId: number): Observable<DatiUtente> {
    return this.http.get<DatiUtente>(`${this.apiUrl}/utente/${utenteId}`);
  }

  // Metodo per calcolare l'IMC (IBM)
  private calcolaIbm(peso: number, altezza: number): number {
    if (altezza > 0) {
      return peso / (altezza * altezza);
    } else {
      return 0;
    }
  }
}
