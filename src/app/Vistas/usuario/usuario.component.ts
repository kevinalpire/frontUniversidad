import { Component, Input, OnInit, inject, input } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { UsuarioService } from '../../Services/usuario/usuario.service';
import { Usuario } from '../../Models/usuario';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent {
  @Input() id!: number;

  private usuarioServicio = inject(UsuarioService);
  public datos: Usuario[] = [];
  public displayedColumns: string[] = ['usuario', 'correo', 'rol', 'accion'];
  constructor(private router: Router) {
    this.obtener();
  }

  obtener() {
    this.usuarioServicio.listar().subscribe({
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
    this.router.navigate(['/usuarios', 0]);
  }

  editar(objeto: Usuario) {
    this.router.navigate(['/usuarios', objeto.id]);
  }

  eliminar(objeto: Usuario) {
    if (confirm('Desea eliminar')) {
      this.usuarioServicio.eliminar(objeto.id).subscribe({
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
