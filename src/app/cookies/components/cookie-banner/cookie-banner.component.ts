import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { PopUpService } from '../../../services/pop-up.service';
import { BannerService } from '../../../services/banner.service';
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
  private bannerService = inject(BannerService);
  private routerSubscription!: Subscription;
  cookies = {
    Analiticas: false,
    Funcionales: true,
    Comerciales: false,
    Marketing: false,
  };

  constructor(private router: Router){}

  bannerVisible = false;


  ngOnInit() {
    this.verificarPreferenciasCookies();
    this.routerSubscription = this.router.events.subscribe(() => {
      this.verificarPreferenciasCookies();
    });

    this.bannerService.bannerVisible$.subscribe(visible => {
      this.bannerVisible = visible;
    });
  }

  verificarPreferenciasCookies() {
    const savedCookies = localStorage.getItem('cookiesPreferences');
    this.bannerVisible = !savedCookies; 
    console.log(this.bannerVisible)
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  acceptCookies() {
    this.cookies.Analiticas = true;
    this.cookies.Funcionales = true;
    this.cookies.Comerciales = true;
    this.cookies.Marketing = true;
    this.guardarEnLocalStorage();
    this.bannerService.actualizarEstadoBanner();
    this.ocultarBanner();
    console.log('Cookies aceptadas');
  }

  rejectCookies() {
    this.cookies.Analiticas = false;
    this.cookies.Funcionales = true; 
    this.cookies.Comerciales = false;
    this.cookies.Marketing = false;
    this.guardarEnLocalStorage();
    this.bannerService.actualizarEstadoBanner();
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