import { Sesso } from "../enums/Sesso";

export interface DatiUtente {
  id?: number;
  peso: number | null;
  altezza: number | null;
  sesso? : Sesso;
  annoNascita: number | null;
  ibm?: number;
  bmr?: number;
  idUtente?: number;
}
