import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookiePopComponent } from '../cookies/components/cookie-pop/cookie-pop.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {


  constructor(public dialog: MatDialog) { }

  openDialog(cookies: any) {
    this.dialog.open(CookiePopComponent, {
      data: cookies,  
    });
    
  }

  
  
}
