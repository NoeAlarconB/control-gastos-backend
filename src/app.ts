import express, { Application } from "express";
import cors from "cors";
import env from './config/env';
import usuarioRoute from './routes/usuarioRoute';
import metodoPagoRoute from './routes/metodoPagoRoute';
import categoriaRoute from './routes/categoriaRoute';
import cuentaBancariaRoute from './routes/cuentaBancariaRoute';
import transaccionRoute from './routes/transaccionRoute';
import presupuestoRoute from './routes/presupuestoRoute';
import authRoute from './routes/authRoute';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(`${env.API_PREFIX}/usuarios`, usuarioRoute);
app.use(`${env.API_PREFIX}/metodos-pagos`, metodoPagoRoute);
app.use(`${env.API_PREFIX}/categorias`, categoriaRoute);
app.use(`${env.API_PREFIX}/cuentas-bancarias`, cuentaBancariaRoute);
app.use(`${env.API_PREFIX}/transacciones`, transaccionRoute);
app.use(`${env.API_PREFIX}/presupuestos`, presupuestoRoute);
app.use(`${env.API_PREFIX}/auth`, authRoute);

export default app;



