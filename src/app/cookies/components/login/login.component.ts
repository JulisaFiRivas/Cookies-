import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TOKEN_KEY, USER_KEY } from '../../../guarded/constantes';

@Component({
  selector: 'app-login',
  imports: [FormsModule,MatButtonModule, MatInputModule,MatCardModule, CommonModule, RouterModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public formBuilder = inject (FormBuilder)
  private router = inject (Router)
  private toastr = inject (ToastrService)
  private authService = inject (AuthService);

  ngOnInit(): void {
      if(this.authService.isLoggedIn()){
        this.router.navigateByUrl('interno/home')
      }
  }

  isSubmitted: boolean = false;

  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.authService.signin(this.form.value).subscribe({
        next: (res: any) => {
          this.authService.saveLocalStorage(res.token, TOKEN_KEY);
          this.authService.saveLocalStorage(JSON.stringify(res.userDto), USER_KEY);
          console.log(localStorage.getItem(TOKEN_KEY));
          this.router.navigateByUrl('interno/home')
        },
        error: err => {
          if (err.status == 400)
            this.toastr.error('Incorrect email or password.', 'Login failed')
          else
            console.log('error during login:\n', err);

        }
      })
    }
  }
}
