// Importación del modelo User
import User from '../models/user.js';

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
    const {name, email, password, role} = req.body;

    try {
        // Crear una nueva instancia de User utilizando los datos proporcionados
        const user = new User({name, email, password, role});

        // Guardar el nuevo usuario en la base de datos
        await user.save();
        // Enviar una respuesta exitosa junto con el usuario creado
        res.status(201).json(user);
    } catch (err) {
        // Verifica si el error es de duplicación de clave
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Ya existe un Salon con el mismo nombre en esta torre' });
        }
        // Enviar una respuesta de error en caso de algún problema durante la creación
        return res.status(400).json({ message: err.message });
        }
    };


// Controlador para obtener todos los usuarios
const getUsers = async (_, res) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await User.find();

        // Enviar la lista de usuarios como respuesta
        res.json(users);
    } catch (err) {
        // Enviar una respuesta de error en caso de algún problema
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener un usuario por su ID
const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar al usuario por su ID en la base de datos
        const user = await User.findById(id);

        // Verificar si el usuario fue encontrado
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Enviar el usuario como respuesta
        return res.json(user);
    } catch (err) {
        // Enviar una respuesta de error en caso de algún problema
        return res.status(500).json({ message: err.message });
    }
};

// Controlador para actualizar la información de un usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const {name, email, password, role} = req.body;

    try {
        // Buscar al usuario por su ID en la base de datos
        const user = await User.findById(id);

        // Verificar si el usuario fue encontrado
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Actualizar la información del usuario con los nuevos datos
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        user.role = role || user.role;

        // Guardar los cambios en la base de datos
        await user.save();
        // Enviar el usuario actualizado como respuesta
        res.json(user);
    } catch (err) {
        // Enviar una respuesta de error en caso de algún problema
        return res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un usuario por su ID
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar al usuario por su ID en la base de datos
        const user = await User.findByIdAndDelete(id);

        // Verificar si el usuario fue encontrado
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        // Enviar una respuesta indicando que el usuario fue eliminado
        return res.json({ message: 'User deleted' });
    } catch (err) {
        // Enviar una respuesta de error en caso de algún problema
        return res.status(500).json({ message: err.message });
    }
};

// Exportar los controladores para su uso en otros archivos
export {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};
