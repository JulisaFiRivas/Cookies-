import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { APP_ROUTES } from './app/app.routes'; // Importa las rutas principales
import { provideHttpClient,  withInterceptors  } from '@angular/common/http'; // 🔹 Importa HttpClient
import { authInterceptor } from './app/interceptor/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES), // 🔹 Pasa las rutas correctamente
    provideAnimations(), // Necesario para Toastr
    provideToastr(), // Habilita Toastr en la app
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
}).catch(err => console.error(err));
