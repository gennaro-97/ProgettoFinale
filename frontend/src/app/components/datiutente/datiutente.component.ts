import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, of } from 'rxjs';
import { DatiutentiService } from '../../services/datiutenti.service';
import { AuthService } from '../../services/auth.service';
import { DatiUtente } from '../../models/DatiUtente';

@Component({
  selector: 'app-datiutente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './datiutente.component.html',
  styleUrls: ['./datiutente.component.css'],
})
export class DatiutenteComponent implements OnInit {
  datiUtente: DatiUtente = {
    peso: 0, // Imposta un valore predefinito invece di null
    altezza: 0
  };

  utenteId: number | undefined = undefined;
  showAddButton: boolean = true; // Mostra il pulsante "Aggiungi Dati" di default

  constructor(
    private datiutentiService: DatiutentiService,
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      // Ottieni l'ID dell'utente autenticato
      this.utenteId = this.authService.getIdUser() ?? undefined;

      if (!this.utenteId) {
        console.error('Utente non autenticato');
        this.router.navigate(['/login']); // Reindirizza alla pagina di login se non autenticato
        return;
      }

      // Carica i dati dell'utente
      await this.getDatiUtente();

      // Nascondi il pulsante "Aggiungi Dati" se i dati sono già presenti
      if (this.datiUtente.peso && this.datiUtente.altezza) {
        this.showAddButton = false;
      }
    } catch (error) {
      console.error('Errore durante l\'inizializzazione del componente:', error);
    }
  }

  /**
   * Salva i dati dell'utente nel backend.
   */
  async saveDatiUtente(): Promise<void> {
    try {
      // Prepara il JSON da inviare al backend
      const datiUtentePayload = {
        peso: this.datiUtente.peso,
        altezza: this.datiUtente.altezza,
        utente: {
          id: this.utenteId, // Associa l'utente autenticato
        },
      };

      await firstValueFrom(this.datiutentiService.saveDatiUtente(datiUtentePayload)
        .pipe(catchError(() => of(null))) // Ignora errori di parsing
      );
      // Dopo il salvataggio, aggiorna i dati utente e nascondi il pulsante
      const dati = await firstValueFrom(this.datiutentiService.getDatiUtente(this.utenteId!));
      if (dati) {
        this.datiUtente = dati;
      }

      window.location.reload();
      // Nascondi il pulsante "Aggiungi Dati"
      this.showAddButton = false
    } catch (error) {
      console.error('Errore nel salvataggio dei dati utente:', error);
    }
  }


  /**
   * Aggiorna i dati dell'utente (peso e altezza) nel backend.
   */
  async aggiornaDatiUtente(): Promise<void> {
    try {
      const datiAggiornati = await firstValueFrom(
        this.datiutentiService.aggiornaDatiUtente(
          this.utenteId!,
          this.datiUtente.peso!,
          this.datiUtente.altezza!
        )
      );
      this.datiUtente = datiAggiornati;



    } catch (error) {
    }
  }

  /**
 * Ottiene i dati dell'utente dal backend e aggiorna il modello.
 */
  async getDatiUtente(): Promise<void> {
    try {
      if (!this.utenteId) {
        console.error('ID utente non disponibile');
        return;
      }

      // Chiama il servizio per ottenere i dati dell'utente
      const dati = await firstValueFrom(this.datiutentiService.getDatiUtente(this.utenteId));
      if (dati) {
        this.datiUtente = dati; // Aggiorna il modello con i dati ricevuti
        console.log('Dati utente caricati con successo:', dati);
      }
    } catch (error) {
      console.error('Errore nel caricamento dei dati utente:', error);
    }
  }
}