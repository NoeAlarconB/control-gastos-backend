import { Decimal } from "@prisma/client/runtime/library";
import { Categoria } from './categoria'; // importa tu modelo real

export interface Presupuesto {
    idPresupuesto?: number;
    idUsuario: number;
    idCategoria: number;
    montoMaximo: Decimal;
    mes: number;
    anio: number;
    estadoAuditoria: string | null;
    fechaCreacion: Date | null;
    fechaActualizacion: Date | null;

    categoria?: Categoria;
}
