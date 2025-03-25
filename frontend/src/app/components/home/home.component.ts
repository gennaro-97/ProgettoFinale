import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [RouterOutlet],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  onLoginClick() {
    this.router.navigate(['/login']); // Naviga programmaticamente al login
  }

  onRegisterClick() {
    this.router.navigate(['/register']); // Naviga programmaticamente al login
  }
}
