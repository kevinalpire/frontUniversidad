import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { AuthComponent } from './Vistas/auth/auth.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Asegúrate de incluir ReactiveFormsModule aquí
    MatTableModule,
    
  ],
})
export class AppModule { }