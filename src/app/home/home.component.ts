import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private router = inject (Router)
  private authService = inject (AuthService)
  private userService = inject (UserService)

  email: string = '';

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (res: any) => this.email = res.email,
      error: (err:any) => console.log('Error al intentar obtener el perfil del usuario:\n', err)
    })
  }

  onLogout(){
    this.authService.deleteToken();
    this.router.navigateByUrl('/signin');
  }

 

}
