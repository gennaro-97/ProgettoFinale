import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.css',
})
export class AdminpageComponent {
  newTaskName: string = ''; // Per il campo di input della nuova task
  tasks = []; // Array per le task
  isEditing: boolean = false; // Flag per sapere se siamo in modalità di modifica
  taskToEdit: any = {}; // Per tenere traccia della task da modificare

  // Eliminare una task
  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}
