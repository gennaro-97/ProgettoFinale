import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/taskservice.service';
import { Task } from '../../models/Task';
import { TipoLavoro } from '../../enums/TipoLavoro';
import { firstValueFrom } from 'rxjs';
import e from 'express';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css'],
})
export class UserpageComponent implements OnInit {
  tasks: Task[] = [];
  utenteId: number = 1; // Sostituisci con l'ID dell'utente loggato, ad esempio da un servizio di autenticazione
  newTask: Task = { 
    titolo: '', 
    descrizione: '', 
    dataInizio: '', 
    dataFine: '', 
    tipoLavoro: undefined, 
    utente: { id: this.utenteId } 
  }; // Assegna l'utenteId alla task
  TipoLavoro = TipoLavoro; // Per accedere all'enum nel template

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTask();
  }


/** Crea una nuova task */
async addTask(): Promise<void> {
  // Verifica se tutti i campi obbligatori sono stati riempiti
  if (!this.newTask.titolo || !this.newTask.descrizione || !this.newTask.dataInizio || !this.newTask.dataFine || !this.newTask.tipoLavoro) {
    console.log('Dati incompleti');
    return;
  }

  try {
    const formatDateTime = (date: string, time: string = "00:00:00.000000"): string => {
      return `${date} ${time}`; // Unisce la data con l'orario predefinito
    };
    // Passa l'utente come oggetto invece di un semplice ID
    const taskToSend = {
      ...this.newTask,
      dataInizio: formatDateTime(this.newTask.dataInizio, "08:00:00.000000"), // Imposta un'ora fissa (08:00)
      dataFine: formatDateTime(this.newTask.dataFine, "18:00:00.000000"), // Imposta un'ora fissa (18:00)
      utente: { id: this.utenteId,
        username: '', // Questi campi non sono necessari per la creazione
        password: '', // ma sono richiesti dal modello Task
        email: '', // quindi li impostiamo a stringa vuota
        role: undefined // e ruolo a 0
       } // Qui trasformiamo l'ID in un oggetto
    };

    await firstValueFrom(this.taskService.createTask(taskToSend)); // Aggiungi la task attraverso il servizio
    this.loadTask(); // Ricarica la lista delle task

    // Reset del form
    this.newTask = { titolo: '', descrizione: '', dataInizio: '', dataFine: '', tipoLavoro: undefined, utente: { id: this.utenteId } };
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
      this.loadTask();
    } catch (error) {
      console.error('Errore nell\'eliminazione della task:', error);
    }
  }

  /** Imposta una task come risolta o non risolta */
  async toggleTaskResolved(id: number, resolved: boolean): Promise<void> {
    try {
      await firstValueFrom(this.taskService.setTaskResolved(id, resolved)); // Aggiorna lo stato della task
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

