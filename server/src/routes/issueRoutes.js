import { Router } from 'express'

import {
    getIssues, getIssue,
    createIssue, updateIssue,
    deleteIssue, addNote, editNote, deleteNote, addManagement
} from '../controllers/issuesController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', authMiddleware(['admin', 'student']), getIssues)//obtiene todas las incidencias
router.get('/:id', authMiddleware(['admin', 'student']), getIssue)//obtiene las incidencias por su ID
router.post('/', authMiddleware(['admin', 'student']), createIssue)//crea una nueva incidencia
router.post('/:id/addNote', authMiddleware(['admin']), addNote)//agrega una nota a las incidencias por su ID
router.put('/:id/notes/:noteId', authMiddleware(['admin']), editNote); // Ruta para editar una nota
router.delete('/:id/notes/:noteId', authMiddleware(['admin']), deleteNote); // Ruta para eliminar una nota
router.post('/:id/addManagement', authMiddleware(['admin']), addManagement)//agrega una gestion a una incidencia
router.put('/:id', authMiddleware(['admin', 'student']), updateIssue)//Actualiza la incidencia por su ID
router.delete('/:id', authMiddleware(['admin', 'student']), deleteIssue)//Elimina una incidencia por su ID

export default router