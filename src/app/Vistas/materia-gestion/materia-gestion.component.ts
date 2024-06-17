import { Component, Input, OnInit, inject, input } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';

import { MateriaGestion } from '../../Models/materiaGestion';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MateriaGestionService } from '../../Services/materiaGestion/MateriaGestionService';

@Component({
  selector: 'app-materiaGestion',
  standalone: true,
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './materia-Gestion.component.html',
  styleUrl: './materia-Gestion.component.css'
})


export class MateriaGestionComponent {

  @Input() id!: number;

  private materiaGestionServicio = inject(MateriaGestionService);
  public datos : MateriaGestion[] = [];
  public displayedColumns : string[] = ['materia','sigla','grupo','aula','docente','carrera','accion'];
  constructor(private router: Router){
    this.obtener();
  }

  obtener(){

    this.materiaGestionServicio.listar().subscribe({
      
      next:(data)=>{
        
        if(data.length > 0){
          this.datos = data;
          console.log(data);
        }
      },
      error:(e)=>{
        console.log("error---"+ e.message);
        this.router.navigate(['/login']);
      }
    })
  }


  nuevo(){
    this.router.navigate(['/materiasGestion',0]);
  }

  editar(objeto:MateriaGestion){
    this.router.navigate(['/materiasGestion',objeto.id]);
  }


  eliminar(objeto:MateriaGestion){
    if(confirm("Desea eliminar")){
      this.materiaGestionServicio.eliminar(objeto.id).subscribe({
        next:(data)=>{
          if(data){
            this.obtener();
          }else{
            alert("no se pudo eliminar")
          }
        },
        error:(err)=>{
          console.log(err.message)
          this.router.navigate(['/login']);
        }
      })
    }
  }



}
