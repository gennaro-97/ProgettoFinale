import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DatiutentiService } from '../../services/datiutenti.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

export const firstLoginGuard: CanActivateFn = (route, state) => {
  const datiUtentiService = inject(DatiutentiService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const utenteId = authService.getIdUser(); // Ottieni l'ID dell'utente

  // Verifica se l'utente ha effettuato il primo accesso
  return new Observable<boolean>((observer) => {
    datiUtentiService.checkFirstLogin(Number(utenteId)).subscribe((isFirstLogin) => {
      if (isFirstLogin) {
        observer.next(true); // Consenti l'accesso alla pagina
      } else {
        // Se non è il primo login, reindirizza alla pagina utente
        router.navigate(['/userpage']);
        observer.next(false); // Impedisce l'accesso alla pagina del primo login
      }
    });
  });
};
