import { Routes } from '@angular/router';
import { COOKIE_ROUTES, COOKIE_ROUTES_INTERNAS } from './cookies/cookies.routes';
import { LoginComponent} from './cookies/components/login/login.component';
import { UserComponent } from './cookies/components/user/user.component';
import { Component } from '@angular/core';
import { RegistrarComponent } from './cookies/components/registrar/registrar.component';
import { PlantillaPublicaComponent } from './plantilla-publica/plantilla-publica.component';
import { PlantillaPrivadaComponent } from './plantilla-privada/plantilla-privada.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guarded/auth.guard';
import { AdminOnlyComponent } from './authorize/admin-only/admin-only.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { CookieListComponent } from './cookies/components/cookie-list/cookie-list.component';
import { CookieFormComponent } from './cookies/components/cookie-form/cookie-form.component';
import { UserListComponent } from './cookies/components/user-list/user-list.component';
import { CookiePoliticasComponent } from './cookies/components/cookie-politicas/cookie-politicas.component';
import { claimReq } from './utils/claimReq-utils';
import { UserListPublicComponent } from './cookies/components/user-list-public/user-list-public.component';

export const APP_ROUTES: Routes = [
    { path: '', component: PlantillaPublicaComponent, 
      children: [
        { path: 'signup', component: RegistrarComponent },
        { path: 'signin', component: LoginComponent },
        { path: 'login', component: LoginComponent },
        { path: 'politicas', component: CookiePoliticasComponent },
        { path: '', component: HomeComponent },
      ]
    },
  
    { path: 'interno', component: PlantillaPrivadaComponent, canActivate: [authGuard], canActivateChild: [authGuard],
      children: [
        { path: 'users', component: UserListPublicComponent,
          data: { claimReq: claimReq.adminOnly }},
        { path: 'admin-only', component: AdminOnlyComponent, data: { requiredRoles: ['Admin'] } },
        { path: 'home', component: HomeComponent },
        { path: 'forbidden', component: ForbiddenComponent },
        { path: 'internasCookies', children: COOKIE_ROUTES_INTERNAS, data: { requiredRoles: ['Admin'] } }
      ]
    },
  ];
  
