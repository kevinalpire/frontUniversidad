import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appSettings } from '../../Settings/appSettings';
import { Aula } from '../../Models/aula';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private http = inject(HttpClient);
  private url: string = appSettings.apiURL + "aulas/";


  constructor() { 
  }

  listar(){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(headers);
    return this.http.get<Aula[]>(`${this.url}listar`, { headers });
  }

  obtener(dato:number){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Aula>(this.url+ "buscar/"+dato, { headers });
  }

  crear(dato: Aula){
    const token = localStorage.getItem('token'); 
   
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Aula>(this.url + "crear", dato, { headers });
  }
  
  editar(dato: Aula){
    const token = localStorage.getItem('token');     
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   
    return this.http.post<Aula>(this.url + "editar", dato, { headers });
  }

  eliminar(dato: number){
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Aula>(this.url + "delete/"+dato, { headers });
  }
}

