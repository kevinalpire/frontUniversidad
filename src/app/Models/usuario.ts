
export interface Usuario {
    id: number;
    email: string;
    username: string;
    password: string;
    roles: Rol[]; 
}

export interface Rol {
    id: number;
    roleEnum: string;
   
}




