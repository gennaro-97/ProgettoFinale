import { Ruolo } from "../enums/Ruolo";
import { UtenteTasksDelGiorno } from "./UtenteTasksDelGiorno";

export interface Utente {
  id?: number;
  username: string;
  password: string;
  email: string;
  ruolo: Ruolo;  
  tasksDelGiorno?: UtenteTasksDelGiorno[];
}
