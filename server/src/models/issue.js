// Importar mongoose para definir el esquema y el modelo
import mongoose, { Schema } from 'mongoose';

// Definir el esquema para los problemas (issues)
const issueSchema = new mongoose.Schema({
  creator: {
    id: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  device: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  deviceStatus: {
    type: String,
    trim: true,
    enum: ['Fixed', 'Damaged', 'Unknown', 'Not Working', 'Working'], // Asegúrate de usar el enum si quieres limitar los valores
    default: 'Unknown'
  },
  status: {
    type: String,
    trim: true,
    enum: ['Open', 'InProgress', 'Closed'], // Asegúrate de tener los valores correctos
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }],
  issuesManagement: [
    {
      responsible: {
        id: {
          type: String,
          required: true,
          trim: true
        },
        name: {
          type: String,
          required: true,
          trim: true
        }
      },
      description: {
        type: String,
        trim: true
      },
      startDate: {
        type: Date,
        default: Date.now
      },
      endDate: {
        type: Date
      },
      usedObjects: {
        type: String
      }
    }
  ]
}, { versionKey: false }); // La opción { versionKey: false } evita la inclusión del campo "__v" en los documentos

// Crear el modelo "Issue" basado en el esquema
const Issue = mongoose.model('Issue', issueSchema);

// Exportar el modelo para su uso en otros archivos
export default Issue;
