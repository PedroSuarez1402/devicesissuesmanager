import { Router } from 'express'

import { getRooms, getRoom, createRoom, updateRoom, deleteRoom } from '../controllers/roomsController.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = Router()

router.get('/', authMiddleware(['admin', 'student']), getRooms)//obtiene las salas
router.get('/:id', authMiddleware(['admin', 'student']), getRoom)//obtiene las salas por si ID
router.post('/', authMiddleware(['admin']), createRoom)//Crea una nueva sala
router.put('/:id', authMiddleware(['admin']), updateRoom)//Actualizar una sala por su ID
router.delete('/:id', authMiddleware(['admin']), deleteRoom)//Eliminar una sala por su ID

export default router