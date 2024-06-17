import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appSettings } from '../../Settings/appSettings';
import { Gestion, TipoGestion } from '../../Models/gestion';
;

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private http = inject(HttpClient);
  private url: string = appSettings.apiURL + "gestion/";


  constructor() { 
  }

  listar(){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Gestion[]>(`${this.url}listar`, { headers });
  }

  listarTipoGestion(){
    const token = localStorage.getItem('token');       
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<TipoGestion[]>(appSettings.apiURL + "tipo_gestion/listar", { headers });
  }

  obtener(dato:number){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Gestion>(this.url+ "buscar/"+dato, { headers });
  }

  obtenerTipoGestion(dato:number){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<TipoGestion>(appSettings.apiURL + "tipo_gestion/buscar/"+dato, { headers });
  }

  crear(dato: Gestion){
    const token = localStorage.getItem('token'); 
   console.log("pasa")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Gestion>(this.url + "crear", dato, { headers });
  }
  
  editar(dato: Gestion){
    const token = localStorage.getItem('token');     
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   
    return this.http.post<Gestion>(this.url + "editar", dato, { headers });
  }

  eliminar(dato: number){
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Gestion>(this.url + "delete/"+dato, { headers });
  }
}

