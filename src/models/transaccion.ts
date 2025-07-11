import { Decimal } from "@prisma/client/runtime/library";

export interface Transaccion {
    idTransacciones?: number;
    idUsuario: number;
    idCategoria: number;
    idMetodoPago: number;
    idCuenta: number;
    monto: Decimal;
    tipo: string;
    descripcion: string | null;
    estadoAuditoria: string | null;
    fechaCreacion: Date | null;
    fechaActualizacion: Date | null;
}
