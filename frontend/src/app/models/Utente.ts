import { Ruolo } from "../enums/Ruolo"; // Update the path to the correct location of 'ruolo'

export interface Utente {
  id?: number; // Facoltativo perché può non essere presente prima di essere salvato
  username: string;
  password: string;
  email: string;
  ruolo: Ruolo;
}
