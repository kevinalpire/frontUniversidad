import { Component, Input, OnInit, inject, input } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { MateriaService } from '../../Services/materia/materia.service';
import { Materia } from '../../Models/materia';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './materia.component.html',
  styleUrl: './materia.component.css'
})


export class MateriaComponent {

  @Input() id!: number;

  private materiaServicio = inject(MateriaService);
  public datos : Materia[] = [];
  public displayedColumns : string[] = ['nombre','sigla','semestre', 'accion'];
  constructor(private router: Router){
    this.obtener();
  }

  obtener(){

    this.materiaServicio.listar().subscribe({
      
      next:(data)=>{
        
        if(data.length > 0){
          this.datos = data;
        }
      },
      error:(e)=>{
        console.log("error---"+ e.message);
        this.router.navigate(['/login']);
      }
    })
  }


  nuevo(){
    this.router.navigate(['/materias',0]);
  }

  editar(objeto:Materia){
    this.router.navigate(['/materias',objeto.id]);
  }


  eliminar(objeto:Materia){
    if(confirm("Desea eliminar")){
      this.materiaServicio.eliminar(objeto.id).subscribe({
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
