import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token){
            return res.status(401).json({message: 'Acceso no autorizado'});
        }
        try {
            /* console.log('La llave secreta es:', process.env.KEY); */

            const decoded = jwt.verify(token, process.env.KEY);
            req.user = await User.findById(decoded.id);

            if(!req.user || (roles.length && !roles.includes(req.user.role))){
                return res.status(403).json({message: 'No tienes permiso para realizar esta accion'})
            }
            next();
        } catch (error) {
            return res.status(401).json({message: 'Token no Valido'})
        }
    }
}

export default authMiddleware;