import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PopUpService } from '../../../services/pop-up.service';
import { inject } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-cookie-banner',
  imports: [MatButtonModule, RouterModule],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.css',
  animations: [
    trigger('bannerAnimation', [
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1,
      })),
      state('hidden', style({
        transform: 'translateY(100%)',
        opacity: 0,
      })),
      transition('visible => hidden', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class CookieBannerComponent implements OnInit {
  private popUpService = inject(PopUpService);
  cookies = {
    Analiticas: false,
    Funcionales: false,
    Comerciales: false,
    Marketing: true,
  };

  bannerVisible = false;

  ngOnInit() {
    const savedCookies = localStorage.getItem('cookiesPreferences');
    if (savedCookies) {
      this.cookies = JSON.parse(savedCookies);
      this.bannerVisible = false; 
    }else{
      this.bannerVisible = true;
    }
  }

  acceptCookies() {
    this.cookies.Analiticas = true;
    this.cookies.Funcionales = true;
    this.cookies.Comerciales = true;
    this.cookies.Marketing = true;
    this.guardarEnLocalStorage();
    this.ocultarBanner();
    console.log('Cookies aceptadas');
  }

  rejectCookies() {
    this.cookies.Analiticas = false;
    this.cookies.Funcionales = false; 
    this.cookies.Comerciales = false;
    this.cookies.Marketing = true;
    this.guardarEnLocalStorage();
    this.ocultarBanner();
    console.log('Cookies rechazadas');
  }
  
  configurarCookies() {
    this.popUpService.openDialog(this.cookies); 
  }

  guardarEnLocalStorage() {
    localStorage.setItem('cookiesPreferences', JSON.stringify(this.cookies));
  }

  ocultarBanner() {
    this.bannerVisible = false; 
  }
}
