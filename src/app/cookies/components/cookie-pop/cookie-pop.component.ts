import { Component, Inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { BannerService } from '../../../services/banner.service';

@Component({
  selector: 'app-cookie-pop',
  standalone: true, 
  imports: [MatCheckboxModule, MatButtonModule, FormsModule, MatDialogModule, MatIcon, MatSlideToggleModule, RouterModule],
  templateUrl: './cookie-pop.component.html',
  styleUrls: ['./cookie-pop.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CookiePopComponent {
  cookies: any;  
  
  constructor(
    public dialogRef: MatDialogRef<CookiePopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bannerService: BannerService

  ) {
    this.cookies = data; 
  }

  closeDialog() {
    this.dialogRef.close();
  }

  guardarConfiguracion() {
    localStorage.setItem('cookiesPreferences', JSON.stringify(this.cookies));
    this.bannerService.hideBanner();
    this.closeDialog();
  }
}
