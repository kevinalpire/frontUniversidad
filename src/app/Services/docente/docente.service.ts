import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appSettings } from '../../Settings/appSettings';
import { Docente, DocenteCreate } from '../../Models/docente';
import { DocenteCreateDTO } from '../../Models/DTO/docenteCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  private http = inject(HttpClient);
  private url: string = appSettings.apiURL + "docentes/";


  constructor() { 
  }

  listar(){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(headers);
    return this.http.get<Docente[]>(`${this.url}listar`, { headers });
  }

  obtener(dato:number){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Docente>(this.url+ "buscar/"+dato, { headers });
  }

  crear(dato: DocenteCreateDTO){
    const token = localStorage.getItem('token'); 
   
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Docente>(this.url + "crear", dato, { headers });
  }
  
  editar(dato: Docente){
    const token = localStorage.getItem('token');     
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   
    return this.http.post<Docente>(this.url + "editar", dato, { headers });
  }

  eliminar(dato: number){
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Docente>(this.url + "delete/"+dato, { headers });
  }
}

