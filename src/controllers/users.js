const { request, response } = require('express');
const User = require('../models/user');

const getUserById = async (req = request, res = response) => {
    const { _id } = req.params;
    try {
        const user = await User.findById(_id).select('-password -__v');
        if (!user) {
            return res.status(400).json({
                message: "Usuario no encontrado"
            });
        }
        res.json(user);
    } catch (error) {
        console.log(error.message, error);
        res.status(500).json({
            message: 'Error al recuperar al usuario',
            error
        });
    }

}

const getUsers = async (req = request, res = response) => {
    try {
        const users = await User.find().select('-password -__v');
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Error al recuperar los usuarios',
            error
        });
    }
}

const updateUser = async (req = request, res = response) => {
    const { _id } = req.params; 
    const { name, email, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== _id) {
            return res.status(400).json({
                message: "El correo electrónico ya está registrado, intente con otro"
            });
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: _id },
            { name, email, role },
            { new: true }
        ).select('-password -__v');
        if (!updatedUser) {
            console.log(updatedUser);
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
        res.json({
            message: `El usuario ha sido actualizado`,
            user: updatedUser
        });
    } catch (error) {
        console.log(error.message, error);
        res.status(500).json({
            message: 'Error al actualizar al usuario',
            error
        });
    }
}

const deleteUser = async (req = request, res = response) => {
    const { _id } = req.params;
    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(400).json({
                message: "Usuario no encontrado"
            });
        }
        res.json(user);
    } catch (error) {
        console.log(error.message, error);
        res.status(500).json({
            message: 'Error al eliminar al usuario',
            error
        });
    }
}

const updateUserProfilePicture = async (req = request, res = response) => {
    const { _id } = req.params;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
        if (!req.file) {
            return res.status(404).json({
                message: "No se ha enviado una imagen"
            });
        }
        user.profilePicture = req.file.path;
        await user.save();
        res.json({
            message: 'Foto de perfil actualizada',
            profilePicture: user.profilePicture
        })

    } catch (error) {
        console.log(error.message, error);
        res.status(500).json({
            message: 'Error al actualizar la foto de perfil',
            error
        });
        
    }

}

const updateUserPassword = async (req = request, res = response) => {
    const { _id } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(400).json({
                message: "Usuario no encontrado"
            });
        }
        if (password) user.password = password;
        await user.save();
        res.json({
            message: 'Contraseña actualizada',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        console.log(error.message, error);
        res.status(500).json({
            message: 'Error al actualzar la contraseña',
            error
        });
    }
}

module.exports = {
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    updateUserProfilePicture,
    updateUserPassword
}