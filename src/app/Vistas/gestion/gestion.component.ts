import { Component, Input, OnInit, inject, input } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { GestionService } from '../../Services/gestion/gestion.service';
import { Gestion } from '../../Models/gestion';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})


export class GestionComponent {

  @Input() id!: number;

  private gestionServicio = inject(GestionService);
  public datos : Gestion[] = [];
  public displayedColumns : string[] = ['nombre','ano','tipo','accion'];
  constructor(private router: Router){
    this.obtener();
  }

  obtener(){

    this.gestionServicio.listar().subscribe({
      
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
    this.router.navigate(['/gestions',0]);
  }

  editar(objeto:Gestion){
    this.router.navigate(['/gestions',objeto.id]);
  }


  eliminar(objeto:Gestion){
    if(confirm("Desea eliminar")){
      this.gestionServicio.eliminar(objeto.id).subscribe({
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
