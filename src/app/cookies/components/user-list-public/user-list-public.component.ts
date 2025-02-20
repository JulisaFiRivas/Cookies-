import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list-public',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, CommonModule, MatIconModule, MatCard, FormsModule],
  templateUrl: './user-list-public.component.html',
  styleUrl: './user-list-public.component.css'
})
export class UserListPublicComponent {
  displayedColumns: string[] = ['Email',  'UltimaConexion'];
  users: any[] = [];
  errorMessage: string = '';
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers() {
    this.userService.getUsersForPublic().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }
}
