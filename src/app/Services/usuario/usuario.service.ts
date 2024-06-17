import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appSettings } from '../../Settings/appSettings';
import { Rol, Usuario } from '../../Models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient);
  private url: string = appSettings.apiURL + "user/";


  constructor() { 
  }

  listar(){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Usuario[]>(`${this.url}listar`, { headers });
  }

  listarRol(){
    const token = localStorage.getItem('token');       
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Rol[]>(`${this.url}listarRol`, { headers });
  }

  obtener(dato:number){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Usuario>(this.url+ "buscar/"+dato, { headers });
  }

  obtenerRol(dato:number){
    const token = localStorage.getItem('token');    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Rol[]>(this.url+ "buscarRol/"+dato, { headers });
  }

  crear(dato: Usuario){
    
    const token = localStorage.getItem('token'); 
   
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Usuario>(this.url + "crear", dato, { headers });
  }
  
  editar(dato: Usuario){
    const token = localStorage.getItem('token');     
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   
    return this.http.post<Usuario>(this.url + "editar", dato, { headers });
  }

  eliminar(dato: number){
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(this.url + "delete/"+dato, { headers });
  }
}