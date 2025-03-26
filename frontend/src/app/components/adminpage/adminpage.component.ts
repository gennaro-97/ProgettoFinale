import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskDelGiorno } from '../../models/TaskDelGiorno';
import { TipoLavoro } from '../../enums/TipoLavoro';
import { AdminService } from '../../services/admin.service';

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
    giornoDellaTask: new Date(),
    tipoLavoro: null // Assumi un valore predefinito
  };
  errorMessage: string = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  /** Carica tutte le Task dal backend */
  loadTasks(): void {
    this.adminService.getAllTasksDelGiorno().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (error) => this.errorMessage = 'Errore nel recupero delle task'
    });
  }

  /** Aggiunge una nuova Task */
  addTask(): void {
    this.adminService.addTaskDelGiorno(this.newTask).subscribe({
      next: () => {
        this.loadTasks();
        this.newTask = {
          titolo: '',
          descrizione: '',
          giornoDellaTask: new Date(),
          tipoLavoro: null // Assumi un valore predefinito
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
