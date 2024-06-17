import { Component, Input, OnInit, inject, input } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { CarreraService } from '../../Services/carrera/carrera.service';
import { Carrera } from '../../Models/carrera';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './carrera.component.html',
  styleUrl: './carrera.component.css'
})


export class CarreraComponent {

  @Input() id!: number;

  private carreraServicio = inject(CarreraService);
  public datos : Carrera[] = [];
  public displayedColumns : string[] = ['nombre','modalidad','accion'];
  constructor(private router: Router){
    this.obtener();
  }

  obtener(){

    this.carreraServicio.listar().subscribe({
      
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
    this.router.navigate(['/carreras',0]);
  }

  editar(objeto:Carrera){
    this.router.navigate(['/carreras',objeto.id]);
  }


  eliminar(objeto:Carrera){
    if(confirm("Desea eliminar")){
      this.carreraServicio.eliminar(objeto.id).subscribe({
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
