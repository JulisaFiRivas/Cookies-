import { Component, inject } from '@angular/core';
import { CookieBannerComponent } from '../cookies/components/cookie-banner/cookie-banner.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-plantilla-publica',
  imports: [CookieBannerComponent, CommonModule, MatToolbarModule, MatButtonModule, RouterOutlet],
  templateUrl: './plantilla-publica.component.html',
  styleUrl: './plantilla-publica.component.css'
})
export class PlantillaPublicaComponent {
  private authService = inject (AuthService)
  constructor(private router: Router) {
  }

  isAuthenticated = false;

  ngOnInit() {
    this.isAuthenticated = this.authService.isLoggedIn(); 
  }

  onLogin() {
    this.authService.signin; 
    this.isAuthenticated = true;
  }

  onLogout() {
    this.authService.deleteToken; 
    this.isAuthenticated = false;
  }
}
