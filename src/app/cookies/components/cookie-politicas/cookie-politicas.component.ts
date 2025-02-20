import { Component, OnInit, inject } from '@angular/core';
import { CookieService } from '../../../services/cookie.service';
import { Cookie } from '../../interfaces/cookie';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-cookie-politicas',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatCardModule, CommonModule, MatProgressSpinnerModule, MatToolbarModule],
  templateUrl: './cookie-politicas.component.html',
  styleUrls: ['./cookie-politicas.component.css']
})
export class CookiePoliticasComponent implements OnInit {
  private cookieService = inject(CookieService);
  private router = inject (Router);
  cookies: Cookie[] = [];
  dataSource = new MatTableDataSource<Cookie>([]);

  loading = true;

  ngOnInit(): void {
    this.loadCookies();
  }

  loadCookies(): void {
    this.cookieService.getCookies().subscribe({
      next: (cookies) => {
        this.loading = false;
        console.log('Datos recibidos del servicio:', cookies);
        this.cookies = cookies;
        this.dataSource.data = cookies; 
        console.log('Datos asignados al dataSource:', this.dataSource.data); 
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar las cookies', err);
      },
    });
  }
  

  irAGestionCookies(): void {
    const router = inject(Router);
    router.navigate(['/interno/internasCookies/list']);
  }
}
