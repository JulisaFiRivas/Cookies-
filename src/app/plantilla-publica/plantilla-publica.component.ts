import { Component } from '@angular/core';
import { CookieBannerComponent } from '../cookies/components/cookie-banner/cookie-banner.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-plantilla-publica',
  imports: [CookieBannerComponent, CommonModule, MatToolbarModule, MatButtonModule, RouterOutlet],
  templateUrl: './plantilla-publica.component.html',
  styleUrl: './plantilla-publica.component.css'
})
export class PlantillaPublicaComponent {

  constructor(private router: Router) {
  }
  onLogin(){
    this.router.navigateByUrl('/signin');
  }
  irAGestionCookies() {
    this.router.navigate(['/interno/internasCookies/list']);
  }
}
