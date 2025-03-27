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
    private userTaskService: UserTaskDelGiornoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.userId = this.authService.getIdUser(); // Ottieni l'ID dell'utente loggato
    this.loadTasksForToday(); // Carica le task disponibili per oggi
    this.loadUserTasks(); // Carica le task assegnate all'utente
  }

  /** Carica tutte le task assegnate all'utente */
  loadUserTasks(): void {
    if (this.userId) {
      this.userTaskService.getTasksByUtente(this.userId).subscribe({
        next: (tasks) => this.userTasks = tasks,
        error: (error) => this.errorMessage = 'Errore nel recupero delle task utente'
      });
    }
  }

  /** Carica tutte le task disponibili per il giorno corrente */
  loadTasksForToday(): void {
    this.tasks$ = this.taskDelGiornoService.getAllTasksDelGiorno();
  }

  /** Assegna una task all'utente */
  assignTask(task: TaskDelGiorno): void {
    // Creiamo l'oggetto UtenteTasksDelGiorno con i dati necessari
    const userTask: UtenteTasksDelGiorno = {
      Utente: { id: this.userId },  // Utente con l'id dell'utente corrente
      taskDelGiorno: { id: task.id },  // Task con l'id della task che stiamo assegnando
      completata: false  // Task non completata di default
    };

    console.log(userTask);

    // Chiamata al servizio per assegnare la task all'utente
    this.userTaskService.assignTaskToUtente(userTask).subscribe({
      next: () => {
        // Puoi chiamare una funzione per aggiornare la lista delle task dell'utente o fare altro.
        this.loadUserTasks(); // Esempio per ricaricare le task assegnate all'utente.
      },
      error: () => this.errorMessage = 'Errore nell\'assegnazione della task'
    });
  }


}
