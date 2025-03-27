import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ruolo } from '../../../enums/Ruolo';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  isAuthenticated: boolean = false; 
  isRoleUser: boolean = false;
  isRoleAdmin: boolean = false;

  private routerSubscription: Subscription | undefined;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Sottoscrizione agli eventi di navigazione per aggiornare l'autenticazione
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAuthenticated = this.authService.isAuthenticated();

        this.isRoleUser = false;
        this.isRoleAdmin = false;

        const userRole = this.authService.getUserRole();

        if (userRole === Ruolo.ADMIN) {
          this.isRoleAdmin = true;
        } else if (userRole === Ruolo.USER) {
          this.isRoleUser = true;
        }
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

  onProfileClick() {
    this.isSidebarOpen = false;
    this.router.navigate(['/userprofile']);
  }

  onTasksClick() {
    this.isSidebarOpen = false;
    this.router.navigate(['/userpage']);
  }

  onUserTaskDelGiornoClick(){
    this.isSidebarOpen = false;
    this.router.navigate(['/userTaskDelGiorno']);
  }

  onTasksDelGiornoClick() {
    this.isSidebarOpen = false;
    this.router.navigate(['/adminpage']);
  }

  onLogoutClick() {
    this.authService.logout();
    this.isSidebarOpen = false;

    // Reset variabili di ruolo
    this.isAuthenticated = false;
    this.isRoleUser = false;
    this.isRoleAdmin = false;

    this.router.navigate(['/']).then(() => {
      window.location.reload(); // Forza l'aggiornamento della navbar
    });
  }

}
