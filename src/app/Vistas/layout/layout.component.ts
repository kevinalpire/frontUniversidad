import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrl: './layout.component.css',
  templateUrl: './layout.component.html',
  
})
export class LayoutComponent implements OnInit {

  token: string ="";
  username: string = "";

  constructor(private router: Router,){
    
  }
  ngOnInit(): void {
  }

  

  goDocente(): void{
    this.router.navigate(['/docentes']);
  }
  goInicio(): void{
    this.router.navigate(['/dashBoard']);
  }
  goAula(): void{
    this.router.navigate(['/aulas']);
  }
  goCarrera(): void{
    this.router.navigate(['/carreras']);
  }

  goUsuario(): void{
    this.router.navigate(['/usuarios']);
  }

  goGestion(): void{
    this.router.navigate(['/gestions']);
  }

  goMateria(): void{
    this.router.navigate(['/materias']);
  }

  goMateriaGestion(): void{
    this.router.navigate(['/materiasGestion']);
  }



  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');    
    this.router.navigate(['/login']);
  }
}



