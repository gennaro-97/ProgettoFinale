import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../service/taskservice.service';
import { Task } from '../../models/Task';
import { TipoLavoro } from '../../enums/TipoLavoro';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css'],
})
export class UserpageComponent implements OnInit {
  tasks: Task[] = [];
  utenteId: number = 1; // Sostituisci con l'ID reale dell'utente loggato
  newTask: Task = {} as Task;
  TipoLavoro = TipoLavoro; // Per accedere all'enum nel template

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
    this.loadTask();
  }

  /** Ottiene tutte le task dell'utente */
  async getTasks(): Promise<void> {
    try {
      this.tasks = await firstValueFrom(this.taskService.getTasksByUtente(this.utenteId));
    } catch (error) {
      console.error('Errore nel recupero delle task:', error);
    }
  }

  /** Crea una nuova task */
  async addTask() {
    // Verifica se tutti i campi obbligatori sono stati riempiti
    if (!this.newTask.titolo || !this.newTask.descrizione || !this.newTask.dataInizio || !this.newTask.dataFine || !this.newTask.tipoLavoro || !this.newTask.utenteId) {
      return;
    }
    this.newTask.utenteId = this.utenteId; // Usa solo l'ID dell'utente

    try {
      await firstValueFrom(this.taskService.createTask(this.newTask)); // Aggiungi la task attraverso il servizio
      this.getTasks(); // Ricarica la lista delle task
      this.newTask = { titolo: '', descrizione: '', dataInizio: '', dataFine: '', tipoLavoro: TipoLavoro.MENTALE, utenteId: this.utenteId }; // Reset del form
    } catch (error) {
      console.error('Errore nella creazione della task:', error);
    }
  }

  async loadTask(): Promise<void> {
    try {
      this.tasks = await firstValueFrom(this.taskService.getTasksByUtente(this.utenteId));
    } catch (error) {
      console.error('Errore nel recupero delle task:', error);
    }
  }
  

  /** Elimina una task */
  async deleteTask(id: number): Promise<void> {
    try {
      await firstValueFrom(this.taskService.deleteTask(id)); // Elimina la task
      this.getTasks(); // Aggiorna la lista
      this.loadTask();
    } catch (error) {
      console.error('Errore nell\'eliminazione della task:', error);
    }
  }

  /** Imposta una task come risolta o non risolta */
  async toggleTaskResolved(id: number, resolved: boolean): Promise<void> {
    try {
      await firstValueFrom(this.taskService.setTaskResolved(id, resolved)); // Aggiorna lo stato della task
      this.getTasks(); // Ricarica la lista
      this.loadTask();
    } catch (error) {
      console.error('Errore nell\'aggiornamento della task:', error);
    }
  }

  /** Ottiene tutte le task risolte */
  async getResolvedTasks(): Promise<void> {
    try {
      this.tasks = await firstValueFrom(this.taskService.getResolvedTasks(this.utenteId));
    } catch (error) {
      console.error('Errore nel recupero delle task risolte:', error);
    }
  }

  /** Ottiene tutte le task non risolte */
  async getUnresolvedTasks(): Promise<void> {
    try {
      this.tasks = await firstValueFrom(this.taskService.getUnresolvedTasks(this.utenteId));
    } catch (error) {
      console.error('Errore nel recupero delle task non risolte:', error);
    }
  }
}

