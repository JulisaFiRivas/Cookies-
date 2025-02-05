import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BannerService {

  
  private bannerVisibleSubject = new BehaviorSubject<boolean>(true); 
  private popupVisibleSubject = new BehaviorSubject<boolean>(false); 

  bannerVisible$ = this.bannerVisibleSubject.asObservable();
  popupVisible$ = this.popupVisibleSubject.asObservable();
  
  constructor() {
    // Verificar si ya hay preferencias guardadas en el localStorage
    this.verificarEstadoBanner();
    const cookiesPreferences = localStorage.getItem('cookiesPreferences');
    if (cookiesPreferences) {
      // Si las preferencias ya están guardadas, ocultar el banner
      this.bannerVisibleSubject.next(false);
    } else {
      // Si no hay preferencias guardadas, mostrar el banner
      this.bannerVisibleSubject.next(true);
    }
  }
  verificarEstadoBanner() {
    const cookiesPreferences = localStorage.getItem('cookiesPreferences');
    this.bannerVisibleSubject.next(!cookiesPreferences);
  }
  showBanner() {
    this.bannerVisibleSubject.next(true);
  }

  hideBanner() {
    this.bannerVisibleSubject.next(false);
  }

  showPopup() {
    this.popupVisibleSubject.next(true);
  }

  hidePopup() {
    this.popupVisibleSubject.next(false);
  }

  actualizarEstadoBanner() {
    this.verificarEstadoBanner();
  }
}