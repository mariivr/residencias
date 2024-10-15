const User = require('../models/user');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { username, rol } = req.body; 
        
        // Verifica si el usuario ya existe
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crea un nuevo usuario
        const newUser = await User.create({ username, rol });

        // Redirige a la vista de usuarios después de crear el usuario
        res.redirect('/api/usuarios');
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

// Obtener todos los usuarios (para mostrar en la vista de edición)
exports.getAllUsers = async (req, res) => {
    try {
        console.log('Get all users route hit');
        const users = await User.findAll();
        res.render('pages/usuarios', { usuarios: users, user: req.session.user });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error al obtener los usuarios');
    }
};

// Actualizar un usuario existente
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Obtén el ID del usuario desde los parámetros de la solicitud
        const { username, rol } = req.body; // Obtén los datos del cuerpo de la solicitud

        // Busca el usuario por ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualiza el usuario con los nuevos datos
        await user.update({ username, rol });

        // Redirige a la vista de usuarios después de actualizar el usuario
        res.redirect('/api/usuarios');
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        const username = req.params.username; // Obtén el nombre de usuario desde los parámetros de la solicitud
        
        // Verifica que el nombre de usuario no esté vacío o indefinido
        if (!username) {
            return res.status(400).json({ message: 'Nombre de usuario no proporcionado' });
        }

        // Busca el usuario por nombre de usuario
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Elimina el usuario de la base de datos
        await User.destroy({ where: { username } });

        // Redirige a la vista de usuarios después de eliminar el usuario
        res.redirect('/api/usuarios');
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};