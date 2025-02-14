import { Component, inject, OnInit, ViewChild, WritableSignal, signal } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';
import { UserService } from '../../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, CommonModule, MatIconModule, MatCard],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private userService = inject(UserService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  // Crear una lista de usuarios y una fuente de datos para la tabla
  users: User[] = [];
  displayedColumns: string[] = [ 'NombreCompleto', 'FechaRegistro','UltimaConexion'];
  dataSource = new MatTableDataSource<User>([]);
  
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/signin');
  }

}
