import { Component, OnInit } from '@angular/core';
import { Utente } from '../../models/Utente';
import { UtenteService } from '../../services/utente.service';
import { DatiutenteComponent } from "../datiutente/datiutente.component";

@Component({
  selector: 'app-first-login-page',
  standalone: true,
  imports: [DatiutenteComponent],
  templateUrl: './first-login-page.component.html',
  styleUrls: ['./first-login-page.component.css']
})
export class FirstLoginPageComponent implements OnInit {
  username: string = "";

  constructor(private utenteService: UtenteService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('idUser'); // Usa 'idUser' per ottenere l'ID dell'utente
    if (userId) {
      // Effettua la richiesta per recuperare i dati dell'utente
      this.utenteService.getUtente(Number(userId)).subscribe({
        next: (utente: Utente) => {
          // Una volta ricevuti i dati dell'utente, salviamo il nome utente
          this.username = utente.username!;
        },
        error: (err) => {
          console.error('Errore nel recupero dei dati dell\'utente:', err);
        }
      });
    }
  }
}
