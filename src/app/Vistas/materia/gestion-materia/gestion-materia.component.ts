import { Component, Input, inject } from '@angular/core';
import { MateriaService } from '../../../Services/materia/materia.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { Materia} from '../../../Models/materia';
import { LayoutComponent } from '../../layout/layout.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { Carrera } from '../../../Models/carrera';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gestion-materia',
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
  templateUrl: './gestion-materia.component.html',
  styleUrl: './gestion-materia.component.css'
})
export class GestionMateriaComponent {
  @Input('id') idMateria! : number;
  private materiaServicio = inject(MateriaService);
  public formBuild = inject(FormBuilder);
  public genero : string = "0";
  carreras : Carrera[] = [];
  semestres: number[] = [1, 2, 3, 4, 5, 6, 7];
  public formMateria:FormGroup = this.formBuild.group({
    nombre: [''],
    sigla:[''],    
    semestre:[''],   
    carrera:[''],    
    Accion : [''],    
  });

  constructor(private router:Router){

   
  }
  ngOnInit(): void {
    this.materiaServicio.listarCarrera().subscribe({
      next: (data) => {
        this.carreras = data; 
      },
      error: (err) => {
        console.log(err.message);
      }
    });

    if (this.idMateria != 0) {
      this.materiaServicio.obtener(this.idMateria).subscribe({
        next: (data) => {
          this.formMateria.patchValue({
            nombre: data.nombre,
            sigla: data.sigla,
            semestre:data.semestre,
            carrera: data.carrera.id
            
          });
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
    
  }
  onCarreraChange(event: any): void {
    const selectedCarreraId = event.value;
    
  }

  guardar() {
    const carreraId = this.formMateria.value.carrera;
    
    this.materiaServicio.obtenerCarrera(carreraId).subscribe({
      next: (carrera) => {
        const objeto: Materia = {
          id: this.idMateria,
          nombre: this.formMateria.value.nombre,
          sigla: this.formMateria.value.sigla,
          semestre: this.formMateria.value.semestre,
          carrera: carrera
        };

        console.log(objeto);

        if (this.idMateria == 0) {
          this.materiaServicio.crear(objeto).subscribe({
            next: (data) => {
              if (data) {
                this.router.navigate(['/materias']);
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
          this.materiaServicio.editar(objeto).subscribe({
            next: (data) => {
              if (data) {
                this.router.navigate(['/materias']);
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
  this.router.navigate(["/materias"]);
}

}
