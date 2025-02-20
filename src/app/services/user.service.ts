import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService); 
  private apiUrl = 'https://localhost:7236/api';

  getUserProfile(){
    return this.http.get(this.apiUrl + '/userProfile');
  }
 
  getUsersForAdmin(){
    const token = localStorage.getItem('token');
    console.log('Token enviado:', token); 
    return this.http.get<any[]>(this.apiUrl + '/Admin');
  }
 
  getUsersForPublic(){
    const token = localStorage.getItem('token');
    console.log('Token enviado:', token); 
    return this.http.get<any[]>(this.apiUrl + '/Usuario');
  }

  updateUser(email: string, newRole: string) {
    const body = { email, newRole };
    return this.http.put(`${this.apiUrl}/admin/updateUserRole`, body, {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
   
  deleteUser(email: string): Observable<any> {
    debugger
    return this.http.delete(`${this.apiUrl}/admin/deleteUser/${email}`);
  }
}
