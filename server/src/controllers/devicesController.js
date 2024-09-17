/* Este archivo devicesController.js contiene controladores que manejan las operaciones CRUD  */
/* Importacion de modelos necesarios */
import Device from '../models/device.js'
import Room from '../models/room.js'
/* Controlador para crear un nuevo dispositivo */
const createDevice = async (req, res) => {
    const {brand, description, roomId} = req.body
     /* Buscar la sala asociada al dispositivo */
    try {
    const room = await Room.findById(roomId).exec()
    
    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }
    /* Crear un nuevo dispositivo utilizando los datos proporcionados */
    const device = new Device({

        brand,   
        description,
        room: room._id,
    })

    
        await device.save()// Guardar el dispositivo en la base de datos
        /* Enviar una respuesta exitosa junto con el dispositivo creado */
        return res.status(201).json(device)
    } catch (err) {
        /* Enviar una respuesta de error si ocurre algún problema durante la creación */
        return res.status(400).json({ message: err.message });
    }
};
/*  Controlador para obtener un dispositivo por su ID*/
const getDevice = async (req, res) => {
    const { id } = req.params

    try {
        const device = await Device.findById(id).populate('room').exec()// Buscar el dispositivo por su ID en la base de datos
        /* Buscar el dispositivo por su ID en la base de datos */
        if (!device) {
            return res.status(404).json({ message: 'Device not found' })
        }
        
        // Enviar el dispositivo con los detalles completos de la sala
        return res.json(device)
        /* Enviar una respuesta de error en caso de algún problema */
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}
/* Controlador para obtener todos los equipos */
const getDevices = async (req, res) => {
    try {
        /* Obtener todo los dispositivos de la base de datos */
        const devices = await Device.find().populate('room').exec()
        
        

        /* Enviar la lista de dispositivos */
        return res.json(devices)
    } catch (err) {
        /* Enviar una respuesta de error en caso de algun problema */
        return res.status(500).json({ message: err.message })
    }
}
/* Actualizar equipo */
const updateDevice = async (req, res) => {
    const { id } = req.params
    const {brand, description, roomId} = req.body

    try {
        // Buscar el dispositivo existente
        const device = await Device.findById(id).exec();
        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }

        // Buscar la sala asociada al roomId
        const room = await Room.findById(roomId).exec();
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        // Actualizar campos del dispositivo
        device.brand = brand;
        device.description = description;
        device.room = room._id;
        // Guardar los cambios en la base de datos
        await device.save();

        // Responder con el dispositivo actualizado
        return res.status(200).json(device);
        
        } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}
/* funcion para eliminar un equipo por su ID */
const deleteDevice = async (req, res) => {
    const { id } = req.params

    try {
        /* Buscar el equipo en la DB */
        const device = await Device.findByIdAndDelete(id);
        /* verifica si el equipo fue encontrado */
        if (!device) return res.status(404).json({message:'Device not found'})
            
            /* Mensaje que elimino el equipo */
            return res.json({ message: 'Device removed' })
        
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
/* Exportar los controladores para ser usados en el resto del codigo */
export { createDevice, getDevice, getDevices, updateDevice, deleteDevice };