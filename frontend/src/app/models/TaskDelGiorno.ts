import { TipoLavoro } from '../enums/TipoLavoro';
import { UtenteTasksDelGiorno } from './UtenteTasksDelGiorno';

export interface TaskDelGiorno {
  id?: number;
  titolo: string;
  descrizione: string;
  giornoDellaTask: string; 
  tipoLavoro: TipoLavoro | null;
  utentiAssegnati?: UtenteTasksDelGiorno[];
}
