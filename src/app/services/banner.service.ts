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
    this.verificarEstadoBanner();
    const cookiesPreferences = localStorage.getItem('cookiesPreferences');
    if (cookiesPreferences) {
      this.bannerVisibleSubject.next(false);
    } else {
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