# Gestor de errores de equipos

Este desarrollo vino por parte de un proyecto universitario realizado en equipo. pero al final retome el proyecto para finalizarlo dandole actualizaciones en otro repositorio, este repositorio es el completo y actualizado con mejoras en front y en back
Este proyecto tiene dos fases, un back con NodeJs para hacer una apirest y un Front desarrollado con react para el consumo de la api

# Motivo del proyecto

>El motivo fue un proyecto en grupo de la universidad, que se trataba de un sistema para reportar equipos dañados de los salones, este proyecto fue abandonado haciendo falta mejoras en el back y un front bien decente. por ende retome el proyecto en el 2024 

`@by Pedro Suarez`

## Correr el proyecto en local

- Abrir la terminal (cmd, powershel, iterm, etc.)

- Escribir `git clone https://github.com/carandev/DevicesIssuesManager.git` o `git clone git@github.com:carandev/DevicesIssuesManager.git` si ya tiene
habilitada la conexión entre su equipo y github con ssh. Tenga en cuenta que en el directorio donde ejecute el comando será donde se cree la carpeta
con el proyecto.

### Corriendo el back

>El back es hecho con NodeJS en una base de datos de tipo NoSQL con MongoDB

- Una vez en la carpeta del proyecto escribimos `cd server` y después `npm install`

- Una vez hechos estos pasos ejecutar el proyecto con `npm run start`

### Corriendo el front

- Una vez en la carpeta del proyecto escribimos `cd web` y después `npm install`

- Una vez hechos estos pasos ejecutar el proyecto con `npm run dev`
