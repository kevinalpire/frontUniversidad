import { Docente } from "../docente";
import { Usuario } from "../usuario";

export interface DocenteCreateDTO {
    user: Usuario;
    docente: Docente;
}