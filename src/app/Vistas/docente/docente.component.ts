import { Component, Input, OnInit, inject, input } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { DocenteService } from '../../Services/docente/docente.service';
import { Docente } from '../../Models/docente';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})


export class DocenteComponent {

  @Input() id!: number;

  private docenteServicio = inject(DocenteService);
  public datos : Docente[] = [];
  public displayedColumns : string[] = ['Código','Nombre','Género','Profesión','Accion'];
  constructor(private router: Router){
    this.obtener();
  }

  obtener(){

    this.docenteServicio.listar().subscribe({
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
    this.router.navigate(['/docentes',0]);
  }

  editar(objeto:Docente){
    this.router.navigate(['/docentes',objeto.id]);
  }


  eliminar(objeto:Docente){
    if(confirm("Desea eliminar el empleado" + objeto.nombre)){
      this.docenteServicio.eliminar(objeto.id).subscribe({
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
