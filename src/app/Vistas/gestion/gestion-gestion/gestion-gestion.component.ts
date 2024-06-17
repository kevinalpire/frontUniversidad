import { Component, Input, inject } from '@angular/core';
import { GestionService } from '../../../Services/gestion/gestion.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { Gestion, TipoGestion} from '../../../Models/gestion';
import { LayoutComponent } from '../../layout/layout.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';

import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gestion-gestion',
  standalone: true,
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, 
    MatOptionModule,
    CommonModule
  ],
  templateUrl: './gestion-gestion.component.html',
  styleUrl: './gestion-gestion.component.css'
})
export class GestionGestionComponent {
  @Input('id') idGestion! : number;
  private gestionServicio = inject(GestionService);
  public formBuild = inject(FormBuilder);
  public genero : string = "0";
  tipoGestiones : TipoGestion[] = [];

  public formGestion:FormGroup = this.formBuild.group({
    nombre: [''],
    ano: [''],   
    tipoG:[''],    
  });

  constructor(private router:Router){

   
  }
  ngOnInit(): void {
    this.gestionServicio.listarTipoGestion().subscribe({
      next: (data) => {
        this.tipoGestiones = data; 
      },
      error: (err) => {
        console.log(err.message);
      }
    });

    if (this.idGestion != 0) {
      this.gestionServicio.obtener(this.idGestion).subscribe({
        next: (data) => {
          
          console.log(data);
          this.formGestion.patchValue({
            nombre: data.nombre,
            ano: data.ano,
            tipoG: data.tipo_gestion.id
           
          }); 
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
    
  }



  guardar() {
    const tipoGestionId = this.formGestion.value.tipoG;    
    
    this.gestionServicio.obtenerTipoGestion(tipoGestionId).subscribe({
      next: (tipoGestion) => {        
        const objeto: Gestion = {          
          id: this.idGestion,
          nombre: this.formGestion.value.nombre,
          ano:this.formGestion.value.ano,
          tipo_gestion: tipoGestion
        };

        

        if (this.idGestion == 0) {
          this.gestionServicio.crear(objeto).subscribe({
            next: (data) => {
              if (data) {
                this.router.navigate(['/gestions']);
              } else {
                alert('Error al crear');
              }
            },
            error: (err) => {
              console.log(err.message);
              this.router.navigate(['/login']);
            }
          });
        } else {
          this.gestionServicio.editar(objeto).subscribe({
            next: (data) => {
              if (data) {
                this.router.navigate(['/gestions']);
              } else {
                alert('Error al editar');
              }
            },
            error: (err) => {
              console.log(err.message);
              this.router.navigate(['/login']);
            }
          });
        }
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

volver(){
  this.router.navigate(["/gestions"]);
}

}
