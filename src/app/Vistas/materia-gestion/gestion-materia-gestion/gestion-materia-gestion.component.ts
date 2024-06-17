import { Component, Input, inject } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { MateriaGestion} from '../../../Models/materiaGestion';
import { LayoutComponent } from '../../layout/layout.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { Modalidad } from '../../../Models/modalidad';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MateriaGestionService } from '../../../Services/materiaGestion/MateriaGestionService';
import { Docente } from '../../../Models/docente';
import { Materia } from '../../../Models/materia';
import { Gestion } from '../../../Models/gestion';
import { Aula } from '../../../Models/aula';
import { DocenteService } from '../../../Services/docente/docente.service';
import { MateriaService } from '../../../Services/materia/materia.service';
import { AulaService } from '../../../Services/aula/aula.service';
import { GestionService } from '../../../Services/gestion/gestion.service';
import { format, parse } from 'date-fns';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { HorarioDTO } from '../../../Models/DTO/HorarioDTO';

@Component({
  selector: 'app-gestion-materiaGestion',
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
    CommonModule,
    CommonModule,
    NgxMaterialTimepickerModule
  ],
  templateUrl: './gestion-materia-Gestion.component.html',
  styleUrl: './gestion-materia-gestion.component.css'
})
export class GestionMateriaGestionComponent {
  @Input('id') idMateriaGestion! : number;  
  public formBuild = inject(FormBuilder);
  public horaFormateada: string = "";

  private materiaGestionServicio = inject(MateriaGestionService);
  private docenteServicio = inject(DocenteService);
  private materiaServicio = inject(MateriaService);
  private aulaServicio = inject(AulaService);
  private gestionServicio = inject(GestionService);

  docentes : Docente[] = [];
  materias : Materia[] = [];
  gestions : Gestion[] = [];
  aulas    : Aula[] = [];


  
  public formMateriaGestion:FormGroup = this.formBuild.group({
    grupo:[],
    id_materia: [],
    id_gestion: [],
    id_aula: [],
    id_docente: [],     
    horario:[]
  });

  constructor(private router:Router){

   
  }
  ngOnInit(): void {
    this.docenteServicio.listar().subscribe({
      next: (data) => {
        this.docentes = data; 
      },
      error: (err) => {
        console.log(err.message);
      }
    });

    this.materiaServicio.listar().subscribe({
      next: (data) => {
        this.materias = data; 
      },
      error: (err) => {
        console.log(err.message);
      }
    });

    this.aulaServicio.listar().subscribe({
      next: (data) => {
        this.aulas = data; 
      },
      error: (err) => {
        console.log(err.message);
      }
    });

    this.gestionServicio.listar().subscribe({
      next: (data) => {
        this.gestions = data; 
      },
      error: (err) => {
        console.log(err.message);
      }
    });

    if (this.idMateriaGestion != 0) {
      this.materiaGestionServicio.obtener(this.idMateriaGestion).subscribe({
        next: (data) => {
          console.log(data);
          this.formMateriaGestion.patchValue({

            grupo:data.grupo,
            id_materia: data.materia.id,
            id_gestion: data.gestion.id,
            id_aula: data.aula.id,
            id_docente: data.docente.id ,
            id_carrera: data.materia.carrera.id            
          });
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
    
  }



  guardar() {
    const docenteId :number= this.formMateriaGestion.value.id_docente;
    const aulaId :number= this.formMateriaGestion.value.id_aula;
    const materiaId :number= this.formMateriaGestion.value.id_materia;
    const gestionId :number = this.formMateriaGestion.value.id_gestion;
    
    const d: Docente = this.materiaGestionServicio.buscarDocente(docenteId, this.docentes);
    const a: Aula = this.materiaGestionServicio.buscarAula(aulaId, this.aulas);
    const m: Materia = this.materiaGestionServicio.buscarMateria(materiaId, this.materias);
    const g: Gestion = this.materiaGestionServicio.buscarGestion(gestionId , this.gestions);
    
    this.horaFormateada = this.formatoHora(this.formMateriaGestion.value.horario);

   
        const objeto: MateriaGestion = {
          id: this.idMateriaGestion,
          materia: m,
          aula: a,
          docente: d,
          gestion: g,
          grupo: this.formMateriaGestion.value.grupo
        };

      console.log(this.horaFormateada);


      const objeto2: HorarioDTO= {
        materiaGestion: objeto,
        horario: this.horaFormateada}

        if (this.idMateriaGestion == 0) {
          this.materiaGestionServicio.crear(objeto2).subscribe({
            next: (data) => {
              if (data) {
                this.router.navigate(['/materiasGestion']);
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
          this.materiaGestionServicio.editar(objeto).subscribe({
            next: (data) => {
              if (data) {
                this.router.navigate(['/materiasGestion']);
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
     
  }

  private formatoHora(horario: string): string {
    const horaDate: Date = parse(horario, 'h:mm a', new Date());
    return format(horaDate, 'HH:mm:ss');
  }

volver(){
  this.router.navigate(["/materiasGestion"]);
}

}

