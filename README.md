## Concesionaria Ford
## Equipo Data Nexus


Nuestro proyecto planea implementa una aplicación especializada y personalizada para el manejo y manipulación de la informacion facilitando la gestión y manejo de los objetos de interés (vehículos,
madrinas, movimientos, etc.) para la concesionaria.


## Características
- Modulo para visualizar y editar los vehículos.
- Modulo para visualizar y editar los patios de almacenamiento.


## Tecnologías

Para el funcionamiento del proyecto usamos:

- **React** (librería de UI)  
- **Vite** (bundler y servidor de desarrollo)  
- **Node.js & Express** (backend REST API)  
- **PostgreSQL** (base de datos relacional)  
- **pg-promise** (cliente de PostgreSQL en Node) 
- **CSS** (Para los estilos de la página)
## Instalación

Para que nuestro proyecto compile se necesita [Node.js](https://nodejs.org/) v10+.

Nos ubicamos en la carpeta agenciaf
Esto es para ejecutar lo correspondiente con respecto al front
```sh
cd agenciaf
npm i
npm run dev
```

Para ejecutar el back, desde la carpeta agenciaf

```sh
cd agenciaf
cd server
npm install --save-dev ts-node @types/node
npx ts-node server.ts
```

## Base de datos

Necesitas crear una base de datos llamada agenciaf, inicias postgres

```
CREATE DATABASE agenciaf
\c agenciaf
\i /ruta/del/script/script.sql
```
Configurar el .env
```
cd agenciaf
cd server
touch .env
```
El formato de la ruta para conectarse a la base de datos debe de ser:
```
DATABASE_URL=postgres://nombre_de_tu_usuario:tu_contraseña@localhost:5432/agenciaf
```
Si tienes el puerto 5432 ocupado, poner el puerto en donde esta el front

   [node.js]: <http://nodejs.org>
   
