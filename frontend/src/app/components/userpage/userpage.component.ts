import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/taskservice.service';
import { Task } from '../../models/Task';
import { TipoLavoro } from '../../enums/TipoLavoro';
import { firstValueFrom } from 'rxjs';
import dayjs from 'dayjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css'],
})
export class UserpageComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchDate: string = '';
  utenteId: number | undefined = undefined;
  newTask: Task = {
    titolo: '',
    descrizione: '',
    dataInizio: '',
    dataFine: '',
    tipoLavoro: undefined,
    utente: { id: this.utenteId }
  };

  TipoLavoro = TipoLavoro; // Per accedere all'enum nel template

  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit(): void {
    this.utenteId = this.authService.getIdUser() ?? undefined; // Ottieni l'ID dell'utente dal servizio AuthService
    this.loadTask();
    this.searchDate = dayjs().format('YYYY-MM-DD'); // Imposta la data di ricerca su oggi
  }

  get progressPercentage(): number {
    const resolvedTasks = this.tasks.filter(task => task.risolta === true).length;
    const totalTasks = this.tasks.length;
    return totalTasks > 0 ? Math.floor((resolvedTasks / totalTasks) * 100) : 0;
  }

  get completedTasksCount(): number {
    return this.tasks.filter(task => task.risolta).length;
  }

  get totalTasksCount(): number {
    return this.tasks.length;
  }

  get resolvedTasks(): Task[] {
    return this.tasks.filter(task => task.risolta === true);
  }

  get unresolvedTasks(): Task[] {
    return this.tasks.filter(task => task.risolta === false);
  }

  get progressImage(): string {
    if (this.progressPercentage >= 0 && this.progressPercentage < 50) {
      return 'assets/images/gattino.jpg'; // Immagine per 0% <= progressPercentage < 50%
    } else if (this.progressPercentage >= 50 && this.progressPercentage < 100) {
      return 'assets/images/leoncino.jpg'; // Immagine per 50% <= progressPercentage < 100%
    } else if (this.progressPercentage === 100) {
      return 'assets/images/leone.avif'; // Immagine per progressPercentage === 100%
    }
    return ''; // Nessuna immagine se progressPercentage non è valido
  }

  /** Crea una nuova task */
  async addTask(): Promise<void> {
    // Verifica se tutti i campi obbligatori sono stati riempiti
    if (!this.newTask.titolo || !this.newTask.descrizione || !this.newTask.dataInizio || !this.newTask.dataFine || !this.newTask.tipoLavoro || !this.utenteId) {
      console.log('Dati incompleti');
      return;
    }

    try {
      // Usa dayjs per formattare la data con orario predefinito
      const formatDateTime = (date: string, time: string = "08:00:00"): string => {
        return dayjs(date).set('hour', parseInt(time.split(':')[0]))
          .set('minute', parseInt(time.split(':')[1]))
          .set('second', parseInt(time.split(':')[2]))
          .format('YYYY-MM-DDTHH:mm:ss'); // Formatta come data e orario
      };

      // Passa l'utente come oggetto invece di un semplice ID
      const taskToSend = {
        ...this.newTask,
        dataInizio: formatDateTime(this.newTask.dataInizio, "08:00:00"), // Imposta un'ora fissa (08:00)
        dataFine: formatDateTime(this.newTask.dataFine, "18:00:00"), // Imposta un'ora fissa (18:00)
        utente: { id: this.utenteId } // Usa l'ID ottenuto dal servizio AuthService
      };

      console.log(taskToSend);
      await firstValueFrom(this.taskService.createTask(taskToSend)); // Aggiungi la task attraverso il servizio
      this.loadTask(); // Ricarica la lista delle task

      // Reset del form
      this.newTask = { titolo: '', descrizione: '', dataInizio: '', dataFine: '', tipoLavoro: undefined, utente: { id: this.utenteId } };
    } catch (error) {
      console.error('Errore nella creazione della task:', error);
    }
  }

  /** Carica le task per l'utente */
  async loadTask(): Promise<void> {
    try {
      if (this.utenteId !== undefined) {
        this.tasks = await firstValueFrom(this.taskService.getTasksByUtente(this.utenteId));
        this.filteredTasks = this.getTasksByDate(this.searchDate);
      } else {
        console.error('Utente ID is undefined');
      }
    } catch (error) {
      console.error('Errore nel recupero delle task:', error);
    }
  }

  /** Elimina una task */
  async deleteTask(id: number): Promise<void> {
    try {
      await firstValueFrom(this.taskService.deleteTask(id)); // Elimina la task
    } catch (error) {
      console.error('Errore nell\'eliminazione della task:', error);
    }
    this.loadTask(); // Ricarica la lista delle task
  }

  /** Imposta una task come risolta o non risolta */
  async toggleTaskResolved(id: number, resolved: boolean): Promise<void> {
    try {
      // Aggiorna lo stato della task nel backend
      await firstValueFrom(this.taskService.setTaskResolved(id, resolved));

      // Aggiorna lo stato della task localmente
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        this.tasks = [...this.tasks];;
      }

      // Aggiorna le liste delle task risolte e non risolte
    } catch (error) {
      console.error('Errore nell\'aggiornamento della task:', error);
    }
    this.loadTask(); // Ricarica la lista delle task
  }

  /** Filtra le task per data */
  getTasksByDate(selectedDate: string): Task[] {
    if (!selectedDate) {
      return this.tasks; // Se non c'è una data, restituisce tutte le task
    }

    // Usa dayjs per confrontare le date in modo coerente
    return this.tasks.filter(task =>
      dayjs(task.dataInizio).format('YYYY-MM-DD') === dayjs(selectedDate).format('YYYY-MM-DD')
    );
  }
}

/** Ottiene tutte le task risolte */
// async getResolvedTasks(): Promise<void> {
//   try {
//     if (this.utenteId !== undefined) {
//       this.tasks = await firstValueFrom(this.taskService.getResolvedTasks(this.utenteId));
//     } else {
//       console.error('Utente ID is undefined');
//     }
//   } catch (error) {
//     console.error('Errore nel recupero delle task risolte:', error);
//   }
// }

/** Ottiene tutte le task non risolte */
// async getUnresolvedTasks(): Promise<void> {
//   try {
//     if (this.utenteId !== undefined) {
//       this.tasks = await firstValueFrom(this.taskService.getUnresolvedTasks(this.utenteId));
//     } else {
//       console.error('Utente ID is undefined');
//     }
//   } catch (error) {
//     console.error('Errore nel recupero delle task non risolte:', error);
//   }
// }


