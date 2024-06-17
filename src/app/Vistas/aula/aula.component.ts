import { Component, Input, OnInit, inject, input } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { AulaService } from '../../Services/aula/aula.service';
import { Aula } from '../../Models/aula';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-aula',
  standalone: true,
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './aula.component.html',
  styleUrl: './aula.component.css',
})
export class AulaComponent {
  @Input() id!: number;

  private aulaServicio = inject(AulaService);
  public datos: Aula[] = [];
  public displayedColumns: string[] = ['modulo', 'piso', 'numero', 'Accion'];
  constructor(private router: Router) {
    this.obtener();
  }

  obtener() {
    this.aulaServicio.listar().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.datos = data;
        }
      },
      error: (e) => {
        console.log('error---' + e.message);
        this.router.navigate(['/login']);
      },
    });
  }

  nuevo() {
    this.router.navigate(['/aulas', 0]);
  }

  editar(objeto: Aula) {
    this.router.navigate(['/aulas', objeto.id]);
  }

  eliminar(objeto: Aula) {
    if (confirm('Desea eliminar?')) {
      this.aulaServicio.eliminar(objeto.id).subscribe({
        next: (data) => {
          if (data) {
            this.obtener();
          } else {
            alert('no se pudo eliminar');
          }
        },
        error: (err) => {
          console.log(err.message);
          this.router.navigate(['/login']);
        },
      });
    }
  }
}
