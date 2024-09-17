import { Router } from 'express'

import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/usersController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', authMiddleware(['admin']), getUsers)//obtiene los usuarios
router.get('/:id', authMiddleware(['admin']), getUser)//obtiene el usuario por su ID
router.post('/', authMiddleware(['admin']), createUser)//crea un nuevo usuario
router.put('/:id', authMiddleware(['admin']), updateUser)//actualiza un usuario por su ID
router.delete('/:id', authMiddleware(['admin']), deleteUser)//elimina un usuario por su ID

export default router