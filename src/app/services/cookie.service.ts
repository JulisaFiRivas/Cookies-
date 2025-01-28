import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Cookie } from '../cookies/interfaces/cookie';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private http = inject(HttpClient);
  private apiUrl= environment.apiUrl;

  getCookies(): Observable<Cookie[]>{
    return this.http.get<Cookie[]>(this.apiUrl);
  }
  getCookieById(id:number): Observable<Cookie>{
    return this.http.get<Cookie>(`${this.apiUrl}/${id}`);
  }
  createCookie(cookie: Partial<Cookie>): Observable<Cookie>{
    return this.http.post<Cookie>(this.apiUrl, cookie);
  }
  updateCookie(id: number, cookie: Partial<Cookie> ): Observable<Cookie>{
    return this.http.put<Cookie>(`${this.apiUrl}/${id}`, cookie);
  }
  deleteCookie(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
