import { Usuario } from "./usuario";

export interface Docente {
    id: number;
    nombre: string;
    codigo: number;
    ci: number;
    profesion: string;
    genero: string;
    usuario:Usuario;
    latitud: number;
    longitud: number;
}

export interface DocenteCreate {
    nombre: string;
    codigo: number;
    ci: number;
    profesion: string;
    genero: string;
}