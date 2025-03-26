import { TipoLavoro } from '../enums/TipoLavoro';
import { UtenteTasksDelGiorno } from './UtenteTasksDelGiorno';

export interface TaskDelGiorno {
  id?: number;
  titolo: string;
  descrizione: string;
  giornoDellaTask: Date; 
  tipoLavoro: TipoLavoro | null;
  utentiAssegnati?: UtenteTasksDelGiorno[];
}
