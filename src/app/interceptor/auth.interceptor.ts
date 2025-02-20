import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TOKEN_KEY } from '../guarded/constantes';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getLocalStorage(TOKEN_KEY); 
  
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`) 
    });

    console.log('Token agregado a la solicitud:', token); 
    return next(clonedReq);
  } else {
    console.log('No se encontró token'); 
    return next(req); 
  }
};
