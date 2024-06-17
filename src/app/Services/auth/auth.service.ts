import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appSettings } from '../../Settings/appSettings';
import { LoginData, LoginResponse } from '../../Models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private url: string = appSettings.apiURL + "login";


  constructor() { 
  }

  login(data: LoginData){    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Tipo de contenido JSON
      'Access-Control-Allow-Origin': 'http://localhost:8080' // Origen permitido
    });    
    return this.http.post<LoginResponse>(this.url, data, { headers: headers });
  }



}
