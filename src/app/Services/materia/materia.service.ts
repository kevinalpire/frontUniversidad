import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appSettings } from '../../Settings/appSettings';
import { Materia } from '../../Models/materia';
import { Carrera } from '../../Models/carrera';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private http = inject(HttpClient);
  private url: string = appSettings.apiURL + "materia/";


  constructor() { 
  }

  listar(){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Materia[]>(`${this.url}listar`, { headers });
  }

  listarCarrera(){
    const token = localStorage.getItem('token');       
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(appSettings.apiURL + "carrera/listar");
    return this.http.get<Carrera[]>(appSettings.apiURL + "carrera/listar", { headers });
  }

  obtener(dato:number){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Materia>(this.url+ "buscar/"+dato, { headers });
  }

  obtenerCarrera(dato:number){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(dato);
    return this.http.get<Carrera>(appSettings.apiURL + "carrera/buscar/"+dato, { headers });
  }

  crear(dato: Materia){
    const token = localStorage.getItem('token'); 
   
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Materia>(this.url + "crear", dato, { headers });
  }
  
  editar(dato: Materia){
    const token = localStorage.getItem('token');     
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   
    return this.http.post<Materia>(this.url + "editar", dato, { headers });
  }

  eliminar(dato: number){
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Materia>(this.url + "delete/"+dato, { headers });
  }
}

