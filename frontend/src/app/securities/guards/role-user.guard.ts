import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Ruolo } from '../../enums/Ruolo';

export const roleUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
    const router = inject(Router);
  
    // Controlla se l'utente è autenticato
    if (!authService.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }
  
    // Controlla se il ruolo dell'utente è ADMIN
    const userRole = authService.getUserRole();
    if (userRole === Ruolo.USER) {
      return true;
    } else {
      router.navigate(['/']); // Reindirizza alla home se non è admin
      return false;
    }
};
