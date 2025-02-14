import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from "@angular/router"
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject (Router);
  private http = inject(HttpClient);
  private apiUrl= 'https://localhost:7236/api'; 

  private sesionUsuario : BehaviorSubject<any> ;
  constructor(){
    this.sesionUsuario = new BehaviorSubject<any>(localStorage.getItem("token"))
  }

  createUser(formData:any){
    return this.http.post(this.apiUrl+'/signup',formData);
  }

  signin(formData:any){
    return this.http.post(this.apiUrl+'/signin',formData);
  }

  isLoggedIn(){
    return localStorage.getItem('token') != null?true:false
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getClaims(){
   return JSON.parse(window.atob(this.getToken()!.split('.')[1]))
  }

}
