import { Routes } from '@angular/router';
import { COOKIE_ROUTES } from './cookies/cookies.routes';

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/cookies', pathMatch: 'full' }, 
    { path: 'cookies', children: COOKIE_ROUTES },
];
