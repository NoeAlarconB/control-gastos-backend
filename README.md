# Proyecto de Control de Gastos

Este proyecto es una aplicación de escritorio desarrollada en Visual Studio para gestionar y controlar gastos personales o de proyectos. Permite registrar ingresos y egresos, categorizar transacciones, etc.

## Comencemos 🚀

### Requisitos previos 📋
- Node.js (v18 o superior)
- npm (v9 o superior)
- TypeScript (v5.8.3)
- PostgreSQL (o la base de datos configurada en Prisma)

### Tecnologías utilizadas 📋
- Backend: Node.js, Express, TypeScript, Prisma (ORM)
- Frontend: React, Vite, TypeScript
- Base de datos: (Configurable a través de Prisma)
- Autenticación: JWT (JSON Web Tokens)
- Documentación API: Swagger UI

## Instalación ⚙
1. Clonar el repositorio

```
git clone https://github.com/tu-usuario/control-gastos-backend.git
cd control-gastos-backend
```

2. Instalar dependencias del backend

```
cd backend
npm i
```

3. Configurar variables de entorno
Crear un archivo .env en la carpeta backend basado en el ejemplo .env.example y configurar las variables necesarias, especialmente la conexión a la base de datos.

4. Configurar Prisma y base de datos

```
npx prisma generate
npx prisma migrate dev --name init
```

5. Instalar dependencias del frontend
```
cd ../frontend
npm install
```

## Ejecución del proyecto ⚙

- Backend

Desde la carpeta backend:

```
# Modo desarrollo
npm run dev
```

```
# Modo producción
npm run build
npm start
```

El backend estará disponible en http://localhost:3000 (o el puerto configurado en las variables de entorno).

Frontend
Desde la carpeta frontend:

```
# Modo desarrollo
npm run dev
```

```
# Modo producción
npm run build
npm run preview
```

El frontend estará disponible en http://localhost:5173 (o el puerto que indique Vite).

Estructura del proyecto
```
proyectofinal/
├── backend/               # Código del servidor
│   ├── src/               # Código fuente TypeScript
│   ├── prisma/            # Configuración de Prisma y migraciones
│   ├── .env               # Variables de entorno
│   └── package.json       # Dependencias del backend
├── frontend/              # Aplicación React
│   ├── src/               # Código fuente del frontend
│   └── package.json       # Dependencias del frontend
└── README.md              # Este archivo
```

## Documentación de la API ⚙

La documentación de la API está disponible en /api-docs cuando el servidor está en ejecución (utiliza Swagger UI).

### Comandos útiles 📋

Backend:

```
npm run dev: Ejecuta el servidor en modo desarrollo con recarga automática
npm run build: Compila el código TypeScript a JavaScript
npm start: Inicia el servidor en modo producción
npx prisma studio: Abre el cliente visual de Prisma para la base de datos
```

Frontend:

```
npm run dev: Inicia el servidor de desarrollo Vite
npm run build: Crea una versión optimizada para producción
npm run preview: Previsualiza la versión de producción
```
