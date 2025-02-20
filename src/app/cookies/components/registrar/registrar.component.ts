import { Component, OnInit } from '@angular/core';
import { FormsModule,  AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators  } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FirstKeyPipe } from '../../pipes/first-key.pipe';
import { AvisoRegistroComponent } from '../aviso-registro/aviso-registro.component';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-registrar',
  imports: [ReactiveFormsModule, FirstKeyPipe, FormsModule,MatButtonModule,MatInputModule, MatCardModule, CommonModule,RouterModule, MatIconModule, AvisoRegistroComponent],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit{
  public formBuilder = inject (FormBuilder)
  private toastr = inject (ToastrService)
  private router = inject (Router)
  private service = inject (AuthService)
  constructor(
    ) { }
  
  ngOnInit(): void {
    if(this.service.isLoggedIn()){
      this.router.navigateByUrl('interno/home')
    }
  }
  isSubmitted: boolean = false;

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')

    if (password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({ passwordMismatch: true })
    else
      confirmPassword?.setErrors(null)

    return null;
  }

  form = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)]],
    confirmPassword: [''],
  }, { validators: this.passwordMatchValidator })



  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      const userData = {
        ...this.form.value, 
        role: "Usuario" 
      };

      this.service.createUser(userData)
        .subscribe({
          next: (res: any) => {
            if (res.succeeded) {
              this.form.reset();
              this.isSubmitted = false;
              this.toastr.success('New user created!', 'Registration Successful');
              this.router.navigateByUrl('interno/home');
            }
          },
          error: err => {
            if (err.error.errors) {
              err.error.errors.forEach((x: any) => {
                switch (x.code) {
                  case "DuplicateUserName":
                    break;
                  case "DuplicateEmail":
                    this.toastr.error('Email is already taken.', 'Registration Failed');
                    break;
                  default:
                    this.toastr.error('Contact the developer', 'Registration Failed');
                    console.log(x);
                    break;
                }
              });
            } else {
              console.log('error:', err);
            }
          }
        });
    }
  }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched)|| Boolean(control?.dirty))
  }
}
 