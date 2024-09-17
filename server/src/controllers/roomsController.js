// Importación del modelo Room
import Room from '../models/room.js';

// Controlador para crear una nueva habitación
const createRoom = async (req, res) => {
  const roomData = req.body;

  
  try {
    // Crear una nueva instancia de Room utilizando los datos proporcionados
    const room = new Room(roomData);

    // Guardar la nueva habitación en la base de datos
    await room.save();

    // Enviar una respuesta exitosa junto con la habitación creada
    return res.status(201).json(room);
  } catch (err) {
    // Verifica si el error es de duplicación de clave
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Ya existe un Salon con el mismo nombre en esta torre' });
    }
    // Enviar una respuesta de error en caso de algún problema durante la creación
    return res.status(400).json({ message: err.message });
  }
};

// Controlador para obtener una habitación por su ID
const getRoom = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la habitación por su ID en la base de datos
    const room = await Room.findById(id).exec();

    // Verificar si la habitación fue encontrada
    if (room) {
      // Enviar la habitación como respuesta
      return res.json(room);
    }

    // Enviar una respuesta de error si la habitación no fue encontrada
    return res.status(404).json({ message: 'Room not found' });
  } catch (err) {
    // Enviar una respuesta de error en caso de algún problema
    return res.status(400).json({ message: err.message });
  }
};

// Controlador para obtener todas las habitaciones
const getRooms = async (req, res) => {
  try {
    // Obtener todas las habitaciones de la base de datos
    const rooms = await Room.find();

    // Enviar la lista de habitaciones como respuesta
    return res.json(rooms);
  } catch (err) {
    // Enviar una respuesta de error en caso de algún problema
    return res.status(500).json({ message: err.message });
  }
};

// Controlador para actualizar la información de una habitación
const updateRoom = async (req, res) => {
  const { id } = req.params;
  const roomData = req.body;

  try {
    // Buscar la habitación por su ID en la base de datos
    const room = await Room.findById(id).exec();

    // Verificar si la habitación fue encontrada
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Actualizar la información de la habitación con los nuevos datos
    room.nombre = roomData.nombre || room.nombre;
    room.torre = roomData.torre || room.torre;
    room.piso = roomData.piso || room.piso;
    room.categoria = roomData.categoria || room.categoria;

    // Guardar los cambios en la base de datos
    try {
      await room.save();
    } catch (err) {
      // Verifica si el error es de duplicación de clave
      if (err.code === 11000) {
        return res.status(400).json({ message: 'Ya existe una habitación con el mismo nombre en esta torre' });
      }

      // Enviar una respuesta de error en caso de algún otro problema
      return res.status(500).json({ message: err.message });
    }

    // Enviar la habitación actualizada como respuesta
    return res.json(room);

  } catch (err) {
    // Enviar una respuesta de error en caso de algún problema
    return res.status(500).json({ message: err.message });
  }
};

// Controlador para eliminar una habitación por su ID
const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la habitación por su ID en la base de datos
    const room = await Room.findByIdAndDelete(id);

    if(!room) return res.status(404).json({message:'Room not found'});

    return res.json({message: 'Room deleted'})

    // Verificar si la habitación fue encontrada
  }catch(err){
    // Enviar una respuesta de error en caso de algún problema
    return res.status(500).json({ message: err.message });
  }
};

// Exportar los controladores para su uso en otros archivos
export {
  createRoom,
  getRoom,
  getRooms,
  updateRoom,
  deleteRoom
};
