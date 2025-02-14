import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { APP_ROUTES } from './app/app.routes'; // Importa las rutas principales
import { provideHttpClient } from '@angular/common/http'; // 🔹 Importa HttpClient

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES), // 🔹 Pasa las rutas correctamente
    provideAnimations(), // Necesario para Toastr
    provideToastr(), // Habilita Toastr en la app
    provideHttpClient()
  ]
}).catch(err => console.error(err));
