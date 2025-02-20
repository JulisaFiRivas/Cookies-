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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Cookie } from '../../interfaces/cookie'; 
import { CookieService } from '../../../services/cookie.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, CommonModule, MatIconModule, MatCard, FormsModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  displayedColumns: string[] = ['Email', 'Acciones'];
  dataSource = new MatTableDataSource<User>([]);
  users: any[] = [];

  editRoleForm: FormGroup;
  selectedUser: any;
  newRole: string='';

  errorMessage: string = '';
  private toastr = inject(ToastrService);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private authService: AuthService,private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.editRoleForm = this.fb.group({
      role: ['', Validators.required]  
    });
  }

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

 selectUser(user: any) {
  console.log('Usuario seleccionado:', user);
  this.selectedUser = user;  
  this.newRole = this.authService.getUserRole(); 
  console.log('Rol obtenido:', this.newRole);

  this.editRoleForm.patchValue({ role: this.newRole });
  console.log(this.selectedUser)
}

  updateUser() {
    if (!this.selectedUser) {
      console.error('No hay usuario seleccionado.');
      return;
    }
  
    const updatedRole = this.editRoleForm.value.role.trim();
    if (!updatedRole) {
      console.error('El campo de rol está vacío.');
      return;
    }
  
    this.userService.updateUser(this.selectedUser.email, updatedRole).subscribe({
      next: () => {
        this.toastr.success('Usuario actualizado con éxito.', 'Éxito');
        this.loadUsers();
        this.cancelEdit();
      },
      error: (err) => {
        this.toastr.error('Error al actualizar el usuario.', 'Error');
        console.error('Error al actualizar el usuario:', err);
      }
    });
  }
  

  cancelEdit() {
    this.selectedUser = null;
    this.editRoleForm.reset();
  }


  deleteUser(user: any) {
    if (confirm(`¿Seguro que deseas eliminar al usuario ${user.email}?`)) {
      this.userService.deleteUser(user.email).subscribe({
        next: () => {
          this.toastr.success('Usuario eliminado correctamente', 'Éxito');  // Muestra un toastr de éxito
          this.users = this.users.filter(u => u.email !== user.email);
          this.loadUsers();
        },
        error: (err) => {
          this.toastr.error('Error al eliminar usuario', 'Error');  // Muestra un toastr de error
          console.error('Error al eliminar usuario', err);
        }
      });
    }
  }
}