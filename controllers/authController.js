const User = require('../models/user'); // Asegúrate de que la ruta sea correcta

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar usuario y contraseña
        const user = await User.findOne({ where: { username } });

        if (user && user.password === password) { // Asegúrate de manejar contraseñas cifradas
            req.session.user = user; // Guardar el usuario en la sesión
            res.redirect('/menu'); // Redirigir a la página de menú
        } else {
            res.redirect('/login'); // Redirigir de vuelta al login si falla
        }
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.redirect('/login'); // Redirigir al login en caso de error
    }
};

