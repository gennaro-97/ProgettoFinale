import {TipoLavoro} from "../enums/TipoLavoro";
import { Utente } from "./Utente";

export interface Task {
  id?: number; // Facoltativo, perché può non essere presente prima di essere salvato
  titolo: string;
  descrizione: string;
  dataInizio: string; // LocalDateTime in Java viene rappresentato come stringa ISO
  dataFine: string;
  risolta?: Boolean; // Facoltativo perché può essere null
  tipoLavoro?: TipoLavoro;
  utente: Partial<Utente>; // <-- Permette di passare solo l'ID; 
}
