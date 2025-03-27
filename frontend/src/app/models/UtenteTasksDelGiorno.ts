import { Utente } from "./Utente";
import { TaskDelGiorno } from './TaskDelGiorno';

export interface UtenteTasksDelGiorno {
  id?: number | null;
  idUtente: number | null;
  taskDelGiorno: TaskDelGiorno;
  completata: boolean;
}
