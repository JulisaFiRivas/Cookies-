import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CookieBannerComponent } from "./cookies/components/cookie-banner/cookie-banner.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatToolbarModule, MatButtonModule, CookieBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crudCookie';
  private router = inject (Router);
  irAGestionCookies() {
    this.router.navigate(['cookies/list']);
  }
}
