export interface Categoria{
    idCategoria?: number;
    idUsuario: number;
    nombre: string;
    tipo: string;
    estadoAuditoria: string | null;
    fechaCreacion: Date | null;
    fechaActualizacion: Date | null;
}