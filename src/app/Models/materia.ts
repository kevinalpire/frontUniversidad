import { Carrera } from "./carrera";

export interface Materia {
    id: number;
    nombre: string;
    sigla: String;
    semestre: number;
    carrera: Carrera;   
}