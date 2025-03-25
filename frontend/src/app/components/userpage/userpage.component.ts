import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css',
})
export class UserpageComponent {}
