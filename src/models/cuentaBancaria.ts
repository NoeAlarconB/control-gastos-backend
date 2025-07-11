import { Decimal } from "@prisma/client/runtime/library";

export interface CuentaBancaria {
    idCuenta?: number;
    idUsuario: number;
    nombre: string;
    saldo: Decimal;
    estadoAuditoria: string | null;
    fechaCreacion: Date | null;
    fechaActualizacion: Date | null;
}
