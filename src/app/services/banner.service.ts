import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor() { }

  private bannerVisibleSubject = new BehaviorSubject<boolean>(true); 
  private popupVisibleSubject = new BehaviorSubject<boolean>(false); 

  bannerVisible$ = this.bannerVisibleSubject.asObservable();
  popupVisible$ = this.popupVisibleSubject.asObservable();

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
}
