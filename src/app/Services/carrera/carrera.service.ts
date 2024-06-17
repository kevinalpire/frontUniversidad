import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appSettings } from '../../Settings/appSettings';
import { Carrera } from '../../Models/carrera';
import { Modalidad } from '../../Models/modalidad';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  private http = inject(HttpClient);
  private url: string = appSettings.apiURL + "carrera/";


  constructor() { 
  }

  listar(){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Carrera[]>(`${this.url}listar`, { headers });
  }

  listarModalidad(){
    const token = localStorage.getItem('token');       
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(appSettings.apiURL + "modalidad/listar");
    return this.http.get<Modalidad[]>(appSettings.apiURL + "modalidad/listar", { headers });
  }

  obtener(dato:number){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Carrera>(this.url+ "buscar/"+dato, { headers });
  }

  obtenerModalidad(dato:number){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Modalidad>(appSettings.apiURL + "modalidad/buscar/"+dato, { headers });
  }

  crear(dato: Carrera){
    const token = localStorage.getItem('token'); 
   
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Carrera>(this.url + "crear", dato, { headers });
  }
  
  editar(dato: Carrera){
    const token = localStorage.getItem('token');     
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   
    return this.http.post<Carrera>(this.url + "editar", dato, { headers });
  }

  eliminar(dato: number){
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Carrera>(this.url + "delete/"+dato, { headers });
  }
}

