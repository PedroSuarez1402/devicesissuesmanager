import jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
import User from "../models/user.js";

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({message: 'Credenciales incorrectas'})
        }

        const token = jwt.sign({id: user._id, role: user.role}, process.env.KEY, {
            expiresIn: '1h'
        });
        res.json({token, user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        res.json(user)
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export {loginUser,
    getMe
};