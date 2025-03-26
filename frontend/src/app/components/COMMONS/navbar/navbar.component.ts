import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  isAuthenticated: boolean = false; // Variabile per la visibilità della navbar
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Sottoscrizione agli eventi di navigazione per aggiornare l'autenticazione
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAuthenticated = this.authService.isAuthenticated();
      }
    });
  }

  ngOnDestroy(): void {
    // Pulisce la sottoscrizione quando il componente viene distrutto
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLoginClick() {
    this.isSidebarOpen = false;
    this.router.navigate(['/login']); // Naviga programmaticamente al login
  }

  onRegisterClick() {
    this.isSidebarOpen = false;
    this.router.navigate(['/register']); // Naviga programmaticamente al register
  }

  onUserPageClick() {
    this.isSidebarOpen = false;
    this.router.navigate(['/userpage']); // Naviga programmaticamente alla user page
  }

  onAdminPageClick() {
    this.isSidebarOpen = false;
    this.router.navigate(['/adminpage']); // Naviga programmaticamente alla admin page
  }

  onLogoutClick(){
    this.authService.logout();
    this.isSidebarOpen = false;
    this.router.navigate(['/']); // Naviga programmaticamente alla admin page
  }
}
