import { Directive, ElementRef, inject, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHideIfClaimsNotMet]'
})
export class HideIfClaimsNotMetDirective {

  @Input("appHideIfClaimsNotMet") claimReq!: Function;
  private authService = inject (AuthService)
  private elementRef = inject (ElementRef)

  ngOnInit(): void {
    const claims = this.authService.getClaims();
    
    if (!this.claimReq(claims))
      this.elementRef.nativeElement.style.display = "none";
  }

}
