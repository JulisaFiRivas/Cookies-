import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from "@angular/router"
import { BehaviorSubject } from 'rxjs';
import { TOKEN_KEY, USER_KEY } from '../guarded/constantes';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject (Router);
  private http = inject(HttpClient);
  private apiUrl= environment.mainUrl; 

  createUser(formData:any){
    return this.http.post(this.apiUrl+'/signup',formData);
  }

  signin(formData:any){
    return this.http.post(this.apiUrl+'/signin',formData);
  }

  saveLocalStorage(token: string, name_key : string){
    localStorage.setItem(name_key,token);
  }

  isLoggedIn(){
    return this.getLocalStorage(TOKEN_KEY) != null ? true : false;
  }

  getLocalStorage(name_key : string) {
    return localStorage.getItem(name_key);
    console.log(TOKEN_KEY)
  }

  deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  deleteLocalStorage(){
    localStorage.removeItem(USER_KEY)
  }

  getClaims(){
   return JSON.parse(window.atob(this.getLocalStorage(TOKEN_KEY)!.split('.')[1]))
  }


  getRoles(): string[] {
    const userData = localStorage.getItem('user'); 
    if (userData) {
      const user = JSON.parse(userData);
      return user.roles || []; 
    }
    return [];
  }

  getUserRole(): string {  
    const userData = localStorage.getItem('user') || '{}';
    const user = JSON.parse(userData);
    return user.rolName || '';  // Retorna el rol del usuario
  }
}
