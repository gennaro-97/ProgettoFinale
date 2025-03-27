import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskDelGiorno } from '../../models/TaskDelGiorno';
import { UserTaskDelGiornoService } from '../../services/user-task-del-giorno.service';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import dayjs from 'dayjs';
import { UtenteTasksDelGiorno } from '../../models/UtenteTasksDelGiorno';

@Component({
  selector: 'app-user-task-del-giorno',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-task-del-giorno.component.html',
  styleUrls: ['./user-task-del-giorno.component.css']
})
export class UserTaskDelGiornoComponent implements OnInit {
  tasks$!: Observable<TaskDelGiorno[]>; // Usa un Observable direttamente nel componente
  userTasks: UtenteTasksDelGiorno[] = []; // Per memorizzare le user tasks
  newTask: TaskDelGiorno = {
    titolo: '',
    descrizione: '',
    giornoDellaTask: "",
    tipoLavoro: null,
  };
  errorMessage: string = '';
  userId: number | null = null;

  constructor(
    private adminService: AdminService,
    private userTaskService: UserTaskDelGiornoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getIdUser(); // Recupera l'ID utente loggato
    this.tasks$ = this.adminService.getAllTasksDelGiorno(); // Ottieni Observable per le task
    this.loadUserTasks(); // Carica le task assegnate all'utente
  }

  // Funzione per formattare la data
  private formatDateTime(date: string, time: string = "08:00:00"): string {
    return dayjs(date)
      .set('hour', parseInt(time.split(':')[0]))
      .set('minute', parseInt(time.split(':')[1]))
      .set('second', parseInt(time.split(':')[2]))
      .format('YYYY-MM-DDTHH:mm:ss'); // Formatta come data e orario
  }

  /** Carica tutte le task assegnate all'utente */
  loadUserTasks(): void {
    this.userTaskService.getTasksByUtente(this.userId!).subscribe({
      next: (tasks) => this.userTasks = tasks,
      error: (error) => this.errorMessage = 'Errore nel recupero delle task utente'
    });
  }

  /** Assegna una task all'utente */
  assignTask(task: TaskDelGiorno): void {
    const userTask: UtenteTasksDelGiorno = {
      id: null,  // Per creare una nuova assegnazione
      idUtente: this.userId!, 
      taskDelGiorno: task,
      completata: false // Task non completata di default
    };

    this.userTaskService.assignTaskToUtente(userTask).subscribe({
      next: () => {
        this.loadUserTasks(); // Ricarica le user tasks dopo l'assegnazione
      },
      error: () => this.errorMessage = 'Errore nell\'assegnazione della task'
    });
  }

  /** Aggiunge una nuova Task */
  addTask(): void {
    if (!this.newTask.titolo || !this.newTask.descrizione || !this.newTask.giornoDellaTask || !this.newTask.tipoLavoro) {
      return;
    }

    const taskToSend = {
      ...this.newTask,
      giornoDellaTask: this.formatDateTime(this.newTask.giornoDellaTask.toString(), "08:00:00"),
    };

    this.adminService.addTaskDelGiorno(taskToSend).subscribe({
      next: () => {
        this.ngOnInit(); // Ricarica le task dopo l'aggiunta
        this.newTask = {
          titolo: '',
          descrizione: '',
          giornoDellaTask: "",
          tipoLavoro: null,
        };
      },
      error: () => (this.errorMessage = 'Errore durante l\'aggiunta della task'),
    });
  }

  /** Elimina una Task */
  deleteTask(id: number): void {
    this.adminService.deleteTaskDelGiorno(id).subscribe({
      next: () => this.ngOnInit(), // Ricarica le task dopo l'eliminazione
      error: () => (this.errorMessage = 'Errore durante l\'eliminazione della task'),
    });
  }
}
