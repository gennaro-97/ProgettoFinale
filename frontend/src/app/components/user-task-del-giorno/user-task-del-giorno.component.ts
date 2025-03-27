import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskDelGiorno } from '../../models/TaskDelGiorno';
import { UtenteTasksDelGiorno } from '../../models/UtenteTasksDelGiorno';
import { TaskDelGiornoService } from '../../services/task-del-giorno.service';
import { UserTaskDelGiornoService } from '../../services/user-task-del-giorno.service';
import { AuthService } from '../../services/auth.service';
import dayjs from 'dayjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-task-del-giorno',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-task-del-giorno.component.html',
  styleUrls: ['./user-task-del-giorno.component.css']
})
export class UserTaskDelGiornoComponent implements OnInit {
  tasks$!: Observable<TaskDelGiorno[]>; // Tasks disponibili per oggi
  userTasks: UtenteTasksDelGiorno[] = []; // Task assegnate all'utente
  errorMessage: string = '';
  userId: number | null = null;

  constructor(
    private taskDelGiornoService: TaskDelGiornoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.userId = this.authService.getIdUser(); // Ottieni l'ID dell'utente loggato
    this.loadTasksForToday(); // Carica le task disponibili per oggi
  }

  /** Carica tutte le task disponibili per il giorno corrente */
  loadTasksForToday(): void {
    this.tasks$ = this.taskDelGiornoService.getAllTasksDelGiorno();
  }

}
