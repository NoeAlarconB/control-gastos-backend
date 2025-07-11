export interface Usuario {
    idUsuario: number;
    username: string;
    email: string;
    contrasenia: string;
    estadoAuditoria: string | null;
    fechaCreacion: Date | null;
    fechaActualizacion: Date | null;
}

