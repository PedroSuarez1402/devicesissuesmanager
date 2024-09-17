import { Router } from 'express';
import { getDevices, getDevice, createDevice, updateDevice, deleteDevice } from '../controllers/devicesController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router();

router.get('/', authMiddleware(['admin', 'student']), getDevices);//Obtiene todos los equipos
router.get('/:id', authMiddleware(['admin', 'student']), getDevice);//Obtiene el equipo por el ID
router.post('/', authMiddleware(['admin']), createDevice);//Crea un nuevo equipo
router.put('/:id', authMiddleware(['admin']), updateDevice);//Actualiza el equipo por su ID
router.delete('/:id', authMiddleware(['admin']), deleteDevice);//Elimina un equipo por su ID

export default router