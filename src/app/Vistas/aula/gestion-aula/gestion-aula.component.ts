import { Component, Input, inject } from '@angular/core';
import { AulaService } from '../../../Services/aula/aula.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Aula } from '../../../Models/aula';
import { LayoutComponent } from '../../layout/layout.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-gestion-aula',
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
  ],
  templateUrl: './gestion-aula.component.html',
  styleUrl: './gestion-aula.component.css',
})
export class GestionAulaComponent {
  @Input('id') idAula!: number;
  private aulaServipisoo = inject(AulaService);
  public formBuild = inject(FormBuilder);

  public formAula: FormGroup = this.formBuild.group({
    modulo: [''],
    numero: [''],
    piso: [''],
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.idAula != 0) {
      this.aulaServipisoo.obtener(this.idAula).subscribe({
        next: (data) => {
          this.formAula.patchValue({
            modulo: data.modulo,
            piso: data.piso,
            numero: data.numero,
          });
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  guardar() {
    const objeto: Aula = {
      id: this.idAula,
      modulo: this.formAula.value.modulo,
      piso: this.formAula.value.piso,
      numero: this.formAula.value.numero,
    };

    console.log(objeto);
    if (this.idAula == 0) {
      this.aulaServipisoo.crear(objeto).subscribe({
        next: (data) => {
          if (data) {
            this.router.navigate(['/aulas']);
          } else {
            alert('Error al crear');
          }
        },
        error: (err) => {
          console.log(err.message);
          this.router.navigate(['/login']);
        },
      });
    } else {
      this.aulaServipisoo.editar(objeto).subscribe({
        next: (data) => {
          if (data) {
            this.router.navigate(['/aulas']);
          } else {
            alert('Error al editar');
          }
        },
        error: (err) => {
          console.log(err.message);
          this.router.navigate(['/login']);
        },
      });
    }
  }

  volver() {
    this.router.navigate(['/aulas']);
  }
}
