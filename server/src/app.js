// Importación de módulos necesarios
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
/* configuracion del dotenv */
dotenv.config()
/* Rutas */
import routes from './routes/index.js'
import bodyParser from 'body-parser'

/* Conexion a la base de datos */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/incidencia_equipos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a la base de datos de mongo'))
.catch(err => console.error('Error al conectar a MongoDB: ', err))

const app = express();// Creación de una instancia de la aplicación Express



app.use(bodyParser.json()); // Middleware para el manejo de datos en formato JSON
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors())
/* Configuracion de las rutas */
routes(app)

/* Inicio del servidor */
app.listen(5000, () => {
  console.log('Servidor escuchando en el puerto 5000');
});
