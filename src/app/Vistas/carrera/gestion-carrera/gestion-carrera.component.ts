import { Component, Input, inject } from '@angular/core';
import { CarreraService } from '../../../Services/carrera/carrera.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { Carrera} from '../../../Models/carrera';
import { LayoutComponent } from '../../layout/layout.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { Modalidad } from '../../../Models/modalidad';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gestion-carrera',
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
  templateUrl: './gestion-carrera.component.html',
  styleUrl: './gestion-carrera.component.css'
})
export class GestionCarreraComponent {
  @Input('id') idCarrera! : number;
  private carreraServicio = inject(CarreraService);
  public formBuild = inject(FormBuilder);
  public genero : string = "0";
  modalidades : Modalidad[] = [];

  public formCarrera:FormGroup = this.formBuild.group({
    nombre: [''],
    modalidades:[''],    
  });

  constructor(private router:Router){

   
  }
  ngOnInit(): void {
    this.carreraServicio.listarModalidad().subscribe({
      next: (data) => {
        this.modalidades = data; 
      },
      error: (err) => {
        console.log(err.message);
      }
    });

    if (this.idCarrera != 0) {
      this.carreraServicio.obtener(this.idCarrera).subscribe({
        next: (data) => {
          this.formCarrera.patchValue({
            nombre: data.nombre,
            modalidades: data.modalidad.id
            
          });
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
    
  }



  guardar() {
    const modalidadId = this.formCarrera.value.modalidades;
    console.log(modalidadId);
    this.carreraServicio.obtenerModalidad(modalidadId).subscribe({
      next: (modalidad) => {
        const objeto: Carrera = {
          id: this.idCarrera,
          nombre: this.formCarrera.value.nombre,
          modalidad: modalidad
        };

        console.log(objeto);

        if (this.idCarrera == 0) {
          this.carreraServicio.crear(objeto).subscribe({
            next: (data) => {
              if (data) {
                this.router.navigate(['/carreras']);
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
          this.carreraServicio.editar(objeto).subscribe({
            next: (data) => {
              if (data) {
                this.router.navigate(['/carreras']);
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
  this.router.navigate(["/carreras"]);
}

}
