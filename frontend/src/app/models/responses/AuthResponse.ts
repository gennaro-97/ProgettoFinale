import { Ruolo } from "../../enums/Ruolo";

export interface AuthResponse {
    token: string;
    username: string;
    role: Ruolo;
    idUser: number;
  }
  