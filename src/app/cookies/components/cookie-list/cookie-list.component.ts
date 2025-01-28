import { Component, inject, OnInit, ViewChild, WritableSignal, signal } from '@angular/core';
import { Cookie } from '../../interfaces/cookie'; 
import { CookieService } from '../../../services/cookie.service';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-cookie-list',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './cookie-list.component.html',
  styleUrl: './cookie-list.component.css'
})
export class CookieListComponent implements OnInit{
  private dialog = inject(MatDialog);
  private router = inject (Router);
  private cookieService = inject(CookieService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cookies: WritableSignal<Cookie[]> = signal <Cookie[]>([]);
  displayedColumns: string[]=["Id", "Nombre", "Descripcion", "Acciones"];
  dataSource= new MatTableDataSource<Cookie>([]);

  ngOnInit(): void {
    this.getCookies();
  }
   
  getCookies(): void {
    this.cookieService.getCookies().subscribe({
      next:(cookies) => {
        this.cookies.set(cookies);
        this.updateTableData();
      }
    })
  }

    updateTableData(){
      this.dataSource.data = this.cookies();
      this.dataSource.paginator = this.paginator;
    }

    editarCookie(id?: number){
      console.log(id)

      const path = id ? `/cookies/edit/${id}` : '/cookies/new';
      this.router.navigate([path])
    }
    deleteCookie(id:number){
      console.log(id);
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);
      dialogRef.afterClosed().subscribe((result)=>{
        if(result){
          this.cookieService.deleteCookie(id).subscribe(()=>
          {
            const updatedCookies = this.cookies().filter((cookie)=>cookie.id !== id);
            this.cookies.set(updatedCookies);
            this.updateTableData();
          })
        }
      })
    }
}

