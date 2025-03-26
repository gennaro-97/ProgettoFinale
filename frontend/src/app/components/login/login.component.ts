import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Ruolo } from '../../enums/Ruolo';
import { AuthRequest } from '../../models/responses/AuthRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(event: Event) {
    event.preventDefault();

    // Creiamo l'oggetto AuthRequest
    const authRequest: AuthRequest = {
      username: this.username, 
      password: this.password
    };

    this.authService.login(authRequest).subscribe({
      next: (response) => {
        console.log('Login success:', response);

        // Controlla il ruolo dell'utente
        if (response.ruolo === Ruolo.USER) {
          this.router.navigate(['/userpage']); // Reindirizza alla userpage
        } else {
          this.router.navigate(['/dashboard']); // Reindirizza ad un'altra pagina per altri ruoli
        }
      },
      error: (error) => {
        console.error('Errore nel login:', error);
        this.errorMessage = 'Credenziali non valide. Riprova.';
      }
    });
  }
}
