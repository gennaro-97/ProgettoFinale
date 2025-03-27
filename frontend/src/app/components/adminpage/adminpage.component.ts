import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskDelGiorno } from '../../models/TaskDelGiorno';
import { TipoLavoro } from '../../enums/TipoLavoro';
import { AdminService } from '../../services/admin.service';
import dayjs from 'dayjs';

@Component({
  selector: 'app-adminpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.css',
})
export class AdminPageComponent implements OnInit {
  tasks: TaskDelGiorno[] = [];
  newTask: TaskDelGiorno = {
    titolo: '',
    descrizione: '',
    giornoDellaTask: "",
    tipoLavoro: null // Assumi un valore predefinito
  };
  errorMessage: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Funzione per formattare e restituire un oggetto Date
private formatDateTime = (date: string, time: string = "08:00:00"): string => {
      return dayjs(date).set('hour', parseInt(time.split(':')[0]))
                        .set('minute', parseInt(time.split(':')[1]))
                        .set('second', parseInt(time.split(':')[2]))
                        .format('YYYY-MM-DDTHH:mm:ss'); // Formatta come data e orario
    };

  /** Carica tutte le Task dal backend */
  loadTasks(): void {
    this.adminService.getAllTasksDelGiorno().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (error) => this.errorMessage = 'Errore nel recupero delle task'
    });
  }

  /** Aggiunge una nuova Task */
  addTask(): void {
    if (!this.newTask.titolo || !this.newTask.descrizione || !this.newTask.giornoDellaTask || !this.newTask.tipoLavoro) {
      return;
    }

    const taskToSend = {
      ...this.newTask,
      giornoDellaTask: this.formatDateTime(this.newTask.giornoDellaTask.toString(), "08:00:00")
    };

    this.adminService.addTaskDelGiorno(taskToSend).subscribe({
      next: () => {
        this.loadTasks();
        this.newTask = {
          titolo: '',
          descrizione: '',
          giornoDellaTask: "",
          tipoLavoro: null
        };
      },
      error: () => this.errorMessage = 'Errore durante l\'aggiunta della task'
    });
  }

  /** Elimina una Task */
  deleteTask(id: number): void {
    this.adminService.deleteTaskDelGiorno(id).subscribe({
      next: () => this.loadTasks(),
      error: () => this.errorMessage = 'Errore durante l\'eliminazione della task'
    });
  }
}
