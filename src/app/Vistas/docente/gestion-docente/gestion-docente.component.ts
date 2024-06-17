import { Component, Input, inject } from '@angular/core';
import { DocenteService } from '../../../Services/docente/docente.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { Docente, DocenteCreate } from '../../../Models/docente';
import { LayoutComponent } from '../../layout/layout.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { UsuarioService } from '../../../Services/usuario/usuario.service';
import { Rol, Usuario } from '../../../Models/usuario';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { DocenteCreateDTO } from '../../../Models/DTO/docenteCreateDTO';


@Component({
  selector: 'app-gestion-docente',
  standalone: true,
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, 
    MatOption,
    MatOptionModule,
    CommonModule
  ],
  templateUrl: './gestion-docente.component.html',
  styleUrl: './gestion-docente.component.css'
})
export class GestionDocenteComponent {
  @Input('id') idDocente! : number;
  private docenteServicio = inject(DocenteService);
  private usuarioServicio = inject(UsuarioService);
  public formBuild = inject(FormBuilder);
  public genero : string = "0";
  public esModificacion: boolean = false;
 

  public formDocente:FormGroup = this.formBuild.group({
    nombre: [''],
    codigo:[''],
    ci:[],
    genero:[''],
    profesion:[''],
    username:[''],
    email:[''],
    password:[''],
    latitud:[''],
    longitud:[''],
   
    
  });

  constructor(private router:Router){}

  ngOnInit(): void {
 
    if(this.idDocente != 0){
      this.docenteServicio.obtener(this.idDocente).subscribe({
        next:(data) =>{
          this.formDocente.patchValue({
            nombre: data.nombre,
            ci:data.ci,
            codigo:data.codigo,
            genero: parseInt(data.genero) ,
            profesion:data.profesion,
            
          })     
          this.esModificacion = true;   
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }

    
  }

guardar(){
  const objeto : Docente = {
    id : this.idDocente,
    nombre: this.formDocente.value.nombre,
    ci: this.formDocente.value.ci,
    genero:this.formDocente.value.genero,
    codigo:this.formDocente.value.codigo,
    profesion:this.formDocente.value.profesion,
    latitud:this.formDocente.value.latitud,
    longitud:this.formDocente.value.longitud,
    usuario: {
      id: 0, username: "", password: "", email: "",
      roles: []
    }
  }

  const newUser: Usuario = {
    id:0,
    username: this.formDocente.value.username,
    password: this.formDocente.value.password,
    email: this.formDocente.value.email,
    roles:[ {id:2, roleEnum :"docente" }]
  }

  const nuevo: DocenteCreateDTO = {
    user:newUser,
    docente:objeto
  }

  console.log(nuevo);
  if(this.idDocente == 0){
    this.docenteServicio.crear(nuevo).subscribe({
      next:(data) =>{
        if(data){
          this.router.navigate(["/docentes"]);
        }else{
          alert("Error al crear")
        }
      },
      error:(err) =>{
        console.log(err.message)
        this.router.navigate(['/login']);
      }
    })
  }else{
    this.docenteServicio.editar(objeto).subscribe({
      next:(data) =>{
        if(data){
          this.router.navigate(["/docentes"]);
        }else{
          alert("Error al editar")
        }
      },
      error:(err) =>{
        console.log(err.message)
        this.router.navigate(['/login']);
      }
    })
  }


}

volver(){
  this.router.navigate(["/docentes"]);
}

}
