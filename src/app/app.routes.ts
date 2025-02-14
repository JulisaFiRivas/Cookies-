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

export const APP_ROUTES: Routes = [
    {path: '', component: PlantillaPublicaComponent, 
        children: [
            {path:'signup', component: RegistrarComponent},
            {path:'signin', component: LoginComponent},
            { path: 'login', component: LoginComponent }, 
            { path: 'cookies', children: COOKIE_ROUTES },
        ]
        
    },

    {path: 'interno', component: PlantillaPrivadaComponent, canActivate:[authGuard], 
        children: [
            {path:'', component: HomeComponent, canActivate:[authGuard]},
            {path: 'admin-only', component: AdminOnlyComponent,
                data:{claimReq: (c: any)=> c.role == "Admin"}},
            {path:'home', component: HomeComponent, canActivate:[authGuard]},
            {path:'forbidden', component: ForbiddenComponent},
            {path: 'internasCookies', children: COOKIE_ROUTES_INTERNAS, canActivate:[authGuard]},
            

        ]
        
    },

    
    

];
