import { Utente } from "./Utente";
import { TaskDelGiorno } from './TaskDelGiorno';

export interface UtenteTasksDelGiorno {
  id?: number | null;
  utente: Utente;
  taskDelGiorno: TaskDelGiorno;
  completata: boolean;
}
