export interface Gestion {
    id: number;
    nombre: string;
    ano: number; 
    tipo_gestion: TipoGestion
}

export interface TipoGestion{
    id: number;
    nombre: string;
    ano: number;   
}