import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './Vistas/auth/auth.component';

import { DocenteComponent } from './Vistas/docente/docente.component';
import { GestionDocenteComponent } from './Vistas/docente/gestion-docente/gestion-docente.component';
import { AulaComponent } from './Vistas/aula/aula.component';
import { GestionAulaComponent } from './Vistas/aula/gestion-aula/gestion-aula.component';
import { CarreraComponent } from './Vistas/carrera/carrera.component';
import { GestionCarreraComponent } from './Vistas/carrera/gestion-carrera/gestion-carrera.component';
import { GestionUsuarioComponent } from './Vistas/usuario/gestion-usuario/gestion-usuario.component';
import { UsuarioComponent } from './Vistas/usuario/usuario.component';
import { GestionGestionComponent } from './Vistas/gestion/gestion-gestion/gestion-gestion.component';
import { GestionComponent } from './Vistas/gestion/gestion.component';
import { MateriaComponent } from './Vistas/materia/materia.component';
import { GestionMateriaComponent } from './Vistas/materia/gestion-materia/gestion-materia.component';
import { GestionMateriaGestionComponent } from './Vistas/materia-gestion/gestion-materia-gestion/gestion-materia-gestion.component';
import { MateriaGestionComponent } from './Vistas/materia-gestion/materia-gestion.component';

import { DashBoardComponent } from './Vistas/dash-board/dash-board.component';

export const routes: Routes = [

    {path:'', component:AuthComponent},
    {path:'login', component:AuthComponent},
    {path:'dashBoard', component:DashBoardComponent},

    {path:'docentes', component:DocenteComponent},
    {path:'docentes/:id',component:GestionDocenteComponent},

    {path:'aulas', component:AulaComponent},
    {path:'aulas/:id',component:GestionAulaComponent},

    {path:'carreras', component:CarreraComponent},
    {path:'carreras/:id',component:GestionCarreraComponent},

    
    {path:'usuarios', component:UsuarioComponent},
    {path:'usuarios/:id',component:GestionUsuarioComponent},

    {path:'gestions', component:GestionComponent},
    {path:'gestions/:id',component:GestionGestionComponent},

    {path:'materias', component:MateriaComponent},
    {path:'materias/:id',component:GestionMateriaComponent},

    {path:'materiasGestion', component:MateriaGestionComponent},
    {path:'materiasGestion/:id',component:GestionMateriaGestionComponent},

    
  

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }