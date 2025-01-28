import { Routes } from "@angular/router"
import { CookieListComponent } from "./components/cookie-list/cookie-list.component"
import { CookieFormComponent } from "./components/cookie-form/cookie-form.component"
import { CookiePoliticasComponent } from "./components/cookie-politicas/cookie-politicas.component";
import { CookieBannerComponent } from "./components/cookie-banner/cookie-banner.component";
export const COOKIE_ROUTES: Routes = [
    {path: '', component: CookieBannerComponent},
    { path: 'politicas', component: CookiePoliticasComponent },
    { path: 'list', component: CookieListComponent },
    { path: 'new', component: CookieFormComponent },
    { path: 'edit/:id', component: CookieFormComponent },
    { path: 'policy', component: CookiePoliticasComponent },
];
