/* Importar el mongoose */
import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
/* Define el esquema para los usuarios */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'student'],
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, { versionKey: false })
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})
/* Crea el modelo user basado en el esquema */
const User = mongoose.model('User', userSchema)
/* exporta el modelo */
export default User
