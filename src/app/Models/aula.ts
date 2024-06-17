export interface Aula {
    id:number;
    piso: number;
    numero: number;
    modulo: number;

}

export interface AulaCreate {
    piso: number;
    numero: number;
    modulo: number;
}