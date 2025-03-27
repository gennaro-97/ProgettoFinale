import { Ruolo } from "../enums/Ruolo";
import { UtenteTasksDelGiorno } from "./UtenteTasksDelGiorno";

export interface Utente {
  id?: number | null;
  username?: string;
  password?: string;
  email?: string;
  ruolo?: Ruolo;  
  tasksDelGiorno?: UtenteTasksDelGiorno[];
}
