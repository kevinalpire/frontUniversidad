import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginData } from '../../Models/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  
  public username: string = "";
  public passwrod: string = "";
  private authService= inject(AuthService);
  public formBuild = inject(FormBuilder);
  private loggedIn = new BehaviorSubject<boolean>(false);

  public formularioLogin : FormGroup= this.formBuild.group({
    username: [''],
    password: ['']
  });
  

  constructor(    
    private router: Router,
    private fb: FormBuilder
  ) {}

  login() {   
    if (this.formularioLogin.valid) {
      const request: LoginData = {
        username: this.formularioLogin.value.username,
        password: this.formularioLogin.value.password
      };

      this.authService.login(request).subscribe(
        response => {
          console.log('Login successful', response);

          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);

          this.router.navigate(['/dashBoard']);
        },
        error => {
          console.error('Login error', error);
        }
      );
    }
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}

