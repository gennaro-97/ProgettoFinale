import { Ruolo } from "../enums/Ruolo";

export interface Utente {
  id?: number;
  username: string;
  password: string;
  email: string;
  ruolo: Ruolo;
}