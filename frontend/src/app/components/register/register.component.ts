import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  register(event: Event): void {
    event.preventDefault(); // Evita il ricaricamento della pagina
    const registerData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Logica di successo (ad esempio, reindirizza l'utente o mostra un messaggio)
          alert('Registrazione avvenuta con successo!');
        } else {
          // Gestisci eventuali errori
          alert('Errore durante la registrazione: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
      });
  }
}
