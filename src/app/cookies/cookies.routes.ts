import { Routes } from "@angular/router"
import { CookieListComponent } from "./components/cookie-list/cookie-list.component"
import { CookieFormComponent } from "./components/cookie-form/cookie-form.component"
import { CookiePoliticasComponent } from "./components/cookie-politicas/cookie-politicas.component";
import { CookieBannerComponent } from "./components/cookie-banner/cookie-banner.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrarComponent } from "./components/registrar/registrar.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { authGuard } from "../guarded/auth.guard";
export const COOKIE_ROUTES: Routes = [
    {path: '', component: LoginComponent},
    { path: 'signin', component: LoginComponent },
    { path: 'users', component: UserListComponent },
    { path: 'signup', component: RegistrarComponent },
];

export const COOKIE_ROUTES_INTERNAS: Routes = [
    { path: 'list', component: CookieListComponent },
    { path: 'new', component: CookieFormComponent },
    { path: 'edit/:id', component: CookieFormComponent},
    { path: 'gestion', component: UserListComponent },

  ];
  