import { Ruolo } from '../enums/ruolo.model';

export interface Utente {
  id?: number; // Facoltativo perché può non essere presente prima di essere salvato
  username: string;
  password: string;
  email: string;
  ruolo: Ruolo;
}
