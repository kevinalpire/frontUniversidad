import { MateriaGestion } from "./materiaGestion";

export interface Asistencia {
id : number;
fecha: String;
hora : String;
minutos_tarde : String;
url: String;
materia_gestion: MateriaGestion
tipo_asistencia:String
}