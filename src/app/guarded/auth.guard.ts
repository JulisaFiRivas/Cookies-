import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigateByUrl('/signin');  
    return false;
  }

  const userRole = authService.getUserRole(); 
  const requiredRoles = route.data?.['requiredRoles'] as string[];
  if (requiredRoles && !requiredRoles.includes(userRole)) {
    router.navigateByUrl('/interno/forbidden');  
    return false;
  }

  return true;
};
