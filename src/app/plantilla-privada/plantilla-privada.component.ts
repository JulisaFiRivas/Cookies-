import { Component, inject } from '@angular/core';
import { CookieBannerComponent } from '../cookies/components/cookie-banner/cookie-banner.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HideIfClaimsNotMetDirective } from '../directives/hide-if-claims-not-met.directive';
import { claimReq } from '../utils/claimReq-utils';
@Component({
  selector: 'app-plantilla-privada',
  imports: [CookieBannerComponent, CommonModule, MatToolbarModule, MatButtonModule, RouterOutlet,  RouterLink, HideIfClaimsNotMetDirective],
  templateUrl: './plantilla-privada.component.html',
  styleUrl: './plantilla-privada.component.css'
})
export class PlantillaPrivadaComponent {
  private authService = inject (AuthService)
  constructor(private router: Router) {
  }
  claimReq = claimReq
  
  irAGestionCookies() {
    this.router.navigate(['/interno/internasCookies/list']);
  }
  onLogout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/signin');
  }
}
