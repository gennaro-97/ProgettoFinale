import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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
    peso: 0,
    altezza: 0,
    ibm: 0,
    idUtente: 0,
  };
  utenteId: number | undefined;

  constructor(
    private datiutentiService: DatiutentiService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      // Ottieni l'ID dell'utente autenticato
      this.utenteId = this.authService.getIdUser() ?? undefined;

      if (!this.utenteId) {
        console.error('Utente non autenticato');
        this.router.navigate(['/login']); // Reindirizza alla pagina di login se non autenticato
        return;
      }

      // Ottieni i dati dell'utente dal backend
      const dati = await firstValueFrom(this.datiutentiService.getDatiUtente(this.utenteId));
      if (dati) {
        this.datiUtente = dati;
      }
    } catch (error) {
      console.error('Errore nel caricamento dei dati utente:', error);
    }
  }

  /**
   * Salva i dati dell'utente nel backend.
   */
  async saveDatiUtente(): Promise<void> {
    try {
      this.datiUtente.idUtente = this.utenteId; // Associa l'utente autenticato
      await firstValueFrom(this.datiutentiService.saveDatiUtente(this.datiUtente));
      console.log('Dati utente salvati con successo!');
      this.router.navigate(['/userpage']); // Reindirizza alla pagina principale
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
          this.datiUtente.peso,
          this.datiUtente.altezza
        )
      );
      this.datiUtente = datiAggiornati;
      console.log('Dati utente aggiornati con successo!');
    } catch (error) {
      console.error('Errore nell\'aggiornamento dei dati utente:', error);
    }
  }
}