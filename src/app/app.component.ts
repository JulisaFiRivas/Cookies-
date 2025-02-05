import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CookieBannerComponent } from "./cookies/components/cookie-banner/cookie-banner.component";
import { BannerService } from './services/banner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatToolbarModule, MatButtonModule, CookieBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crudCookie';
  bannerVisible$: Observable<boolean>;
  isHomePage = false;
  bannerVisible = false;
  constructor(private router: Router, public bannerService: BannerService) {
    this.bannerVisible$ = this.bannerService.bannerVisible$; 
  }

  irAGestionCookies() {
    this.router.navigate(['cookies/list']);
  }

  ngOnInit() {
    
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/cookies'; 
    });

    this.bannerService.bannerVisible$.subscribe(isVisible => {
      this.bannerVisible = isVisible;
    });
  }
  
}
