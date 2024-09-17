/* Importa mongoose */
import mongoose from 'mongoose'
/* Define el esquema para las salas */
const roomSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  torre: {
    type: String,
    require: true,
    uppercase: true
  },
  piso: {
    type: Number,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  categoria: {
    type: String,
    require: true
  }
}, { versionKey: false })// La opción { versionKey: false } evita la inclusión del campo "__v" en los documentos

// Definir un índice compuesto único para los campos nombre y torre
roomSchema.index({ nombre: 1, torre: 1 }, { unique: true });
/* Crea el modelo room basado en el esquema */
const Room = mongoose.model('Room', roomSchema)
/* Exporta el modelo room */
export default Room
