// Importación de modelos necesarios
import Device from '../models/device.js';
import Issue from '../models/issue.js';
import User from '../models/user.js';
import Note from '../models/note.js';

// Controlador para crear un nuevo problema
const createIssue = async (req, res) => {
  const issueData = req.body;

  try {
    // Buscar el usuario creador y el dispositivo asociado al problema
    const user = await User.findById(issueData.creatorId).exec();
    const device = await Device.findById(issueData.deviceId).exec();

    // Crear un nuevo problema utilizando los datos proporcionados
    const issue = new Issue({
      creator: {
        id: user._id,
        name: user.name
      },
      device: device._id,
      type: issueData.type,
      description: issueData.description,
      deviceStatus: issueData.deviceStatus,
      status: issueData.status,
      notes: [],
      issuesManagement: []
    });

    // Guardar el problema en la base de datos
    await issue.save();

    // Enviar una respuesta exitosa junto con el problema creado
    res.status(201).json(issue);
  } catch (err) {
    // Enviar una respuesta de error si ocurre algún problema durante la creación
    res.status(400).json({ message: err.message });
  }
};

// Controlador para obtener todos los problemas
const getIssues = async (req, res) => {
  try {
    const user = req.user
    let query = {};

    if(user.role === 'student'){
      query = { 'creator.id': user._id }
    }
    // Obtener todos los problemas de la base de datos
    const issues = await Issue.find(query).populate({
      path: 'device',
      populate: {path: 'room'}
    })
    .populate('notes')
    .exec();

    // Enviar la lista de problemas como respuesta
    res.json(issues);
    /* console.log(issues) */

  } catch (err) {
    // Enviar una respuesta de error en caso de algún problema
    res.status(500).json({ message: err.message });
  }
};

// Controlador para obtener un problema por su ID
const getIssue = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el problema por su ID en la base de datos
    const issue = await Issue.findById(id)
    .populate({
      path: 'device',
      populate: {path: 'room'}
    })
    .populate('notes')
    .exec();

    // Verificar si el problema fue encontrado
    if (!issue) return res.status(404).json({ message: 'Issue not found' });
    /* console.log(issue) */
    if(req.user.role === 'student' && issue.creator.id.toString() !== req.user._id.toString()){
      return res.status(403).json({ message: 'No tienes permiso para ver este issue' });
    }
    // Enviar el problema como respuesta
    return res.json(issue);
    

  } catch (err) {
    // Enviar una respuesta de error en caso de algún problema
    return res.status(500).json({ message: err.message });
  }
};

// Controlador para actualizar la información de un problema
const updateIssue = async (req, res) => {
  const { id } = req.params;
  const issueData = req.body;

  try {

    // Buscar el problema por su ID en la base de datos
    const issue = await Issue.findById(id).exec();

    // Verificar si el problema fue encontrado
    if (issue) {
      // Actualizar la información del problema con los nuevos datos
      issue.type = issueData.type || issue.type;
      issue.description = issueData.description || issue.description;
      issue.deviceStatus = issueData.deviceStatus || issue.deviceStatus;
      issue.status = issueData.status || issue.status;

      // Guardar los cambios en la base de datos
      await issue.save();

      // Enviar el problema actualizado como respuesta
      return  res.json(issue);
    }

    // Enviar una respuesta de error si el problema no fue encontrado
    return res.status(404).json({ message: 'Issue not found' });
  } catch (err) {
    console.error('Error actualizando la issue:', err.message);
    // Enviar una respuesta de error en caso de algún problema
    return res.status(500).json({ message: err.message });
  }
};

// Controlador para eliminar un problema por su ID
const deleteIssue = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el problema por su ID en la base de datos
    const issue = await Issue.findByIdAndDelete(id);

    // Verificar si el problema fue encontrado
    if (!issue) return res.status(404).json({ message: 'Issue not found' });
      // Enviar una respuesta indicando que el problema fue eliminado
      return res.json({ message: 'Issue removed' });

      
  } catch (err) {
    // Enviar una respuesta de error en caso de algún problema
    res.status(500).json({ message: err.message });
  }
};

// Controlador para agregar una nota a un problema
const addNote = async (req, res) => {
  const { id } = req.params;
  const {content, creatorName} = req.body;

  try {
    // Buscar el problema por su ID en la base de datos
    const issue = await Issue.findById(id).exec();

    // Verificar si el problema fue encontrado
    if (!issue) return res.status(404).json({ message: 'Issue not found' });
      // Agregar la nota al problema
      const newNote = new Note({
        content,
        creatorName,
      })

      await newNote.save()

      issue.notes.push(newNote._id)
      // Guardar los cambios en la base de datos
      await issue.save();

      // Devolver la issue actualizada con las notas pobladas
      const updatedIssue = await Issue.findById(id)
      .populate({
        path: 'device',
        populate: { path: 'room' }
      })
      .populate('notes')
      .exec();
      /* console.log("La nota creada y subida es: ",updateIssue) */

      // Enviar el problema actualizado como respuesta
      return res.json(updatedIssue);
    
  } catch (err) {
    // Enviar una respuesta de error en caso de algún problema
    return res.status(500).json({ message: err.message });
  }
};
const editNote = async (req, res) => {
  const {noteId} = req.params;
  const {content} = req.body;

  try {
    const note = await Note.findById(noteId).exec();
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.content = content;

    await note.save();

    return res.json(note);
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
}
// Controlador para eliminar una nota en un problema
const deleteNote = async (req, res) => {
  const { id, noteId } = req.params;

  try {
    await Note.findByIdAndDelete(noteId)

    const issue = await Issue.findByIdAndUpdate(
      id,
      {$pull: {notes: noteId}},
      {new: true}
    ).exec()

    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    return res.json(issue);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// Controlador para agregar una gestión a un problema
const addManagement = async (req, res) => {
  const { id } = req.params;
  const managementData = req.body;

  try {
    // Buscar el problema por su ID en la base de datos
    const issue = await Issue.findById(id).exec();

    // Verificar si el problema fue encontrado
    if (issue) {
      // Agregar la gestión al problema
      issue.issuesManagement.push({
        responsible: {
          id: managementData.responsibleId,
          name: managementData.responsibleName
        },
        description: managementData.description,
        startDate: managementData.startDate,
        endDate: managementData.endDate,
        usedObjects: managementData.usedObjects
      });

      // Actualizar el estado del problema con el nuevo estado
      issue.status = managementData.status;

      // Guardar los cambios en la base de datos
      await issue.save();

      // Enviar el problema actualizado como respuesta
      return res.json(issue);
    }

    // Enviar una respuesta de error si el problema no fue encontrado
    return res.status(404).json({ message: 'Issue not found' });
  } catch (err) {
    // Enviar una respuesta de error en caso de algún problema
    return res.status(500).json({ message: err.message });
  }
};

// Exportar los controladores para su uso en otros archivos
export {
  createIssue,
  getIssues,
  getIssue,
  updateIssue,
  deleteIssue,
  addNote,
  editNote,
  deleteNote,
  addManagement
};
