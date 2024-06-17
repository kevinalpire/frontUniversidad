import { Aula } from "./aula";
import { Docente } from "./docente";
import { Gestion } from "./gestion";
import { Materia } from "./materia";

export interface MateriaGestion {
    id: number;
    materia: Materia;   
    gestion: Gestion;
    aula:Aula;
    docente:Docente;     
    grupo: String
}
