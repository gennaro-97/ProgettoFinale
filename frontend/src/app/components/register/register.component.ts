import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Utente } from '../../models/Utente';
import { Ruolo } from '../../enums/Ruolo';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(event: Event) {
    event.preventDefault(); // Evita il reload della pagina

    const newUser: Utente = {
      username: this.username,
      email: this.email,
      password: this.password,
      ruolo: Ruolo.USER
    };

    this.authService.register(newUser).subscribe({
      next: (response) => {
        console.log('Registrazione avvenuta con successo:', response);
        this.router.navigate(['/login']); // Redirige al login dopo la registrazione
      },
      error: (error) => {
        console.error('Errore nella registrazione:', error);
        this.errorMessage = 'Errore durante la registrazione. Riprova.';
      }
    });
  }
}
