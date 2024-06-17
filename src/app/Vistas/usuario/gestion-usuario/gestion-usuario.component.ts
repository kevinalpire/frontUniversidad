import { Component, Input, inject } from '@angular/core';
import { UsuarioService } from '../../../Services/usuario/usuario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Rol, Usuario } from '../../../Models/usuario';
import { LayoutComponent } from '../../layout/layout.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';

import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-usuario',
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
  ],
  templateUrl: './gestion-usuario.component.html',
  styleUrl: './gestion-usuario.component.css',
})
export class GestionUsuarioComponent {
  @Input('id') idUsuario!: number;
  private usuarioServicio = inject(UsuarioService);
  public formBuild = inject(FormBuilder);
  public genero: string = '0';
  roles: Rol[] = [];

  public formUsuario: FormGroup = this.formBuild.group({
    username: [''],
    password: [''],
    email: [''],
    roles: [''],
  });

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.usuarioServicio.listarRol().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.log(err.message);
      },
    });

    if (this.idUsuario != 0) {
      this.usuarioServicio.obtener(this.idUsuario).subscribe({
        next: (data) => {
          this.formUsuario.patchValue({
            username: data.username,
            email: data.email,
            password: '',
            roles: data.roles[0].id,
          });
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  guardar() {
    const rolId = this.formUsuario.value.roles;

    this.usuarioServicio.obtenerRol(rolId).subscribe({
      next: (rol) => {
        const objeto: Usuario = {
          id: this.idUsuario,
          username: this.formUsuario.value.username,
          email: this.formUsuario.value.email,
          password: this.formUsuario.value.password,
          roles: rol,
        };
        console.log(objeto);

        if (this.idUsuario == 0) {
          this.usuarioServicio.crear(objeto).subscribe({
            next: (data) => {
              if (data) {
                this.router.navigate(['/usuarios']);
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
          this.usuarioServicio.editar(objeto).subscribe({
            next: (data) => {
              if (data) {
                this.router.navigate(['/usuarios']);
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
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  volver() {
    this.router.navigate(['/usuarios']);
  }
}
