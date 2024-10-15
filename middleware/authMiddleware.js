const User = require('../models/user'); // Ajusta la ruta según tu estructura de proyecto

// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next(); // Usuario autenticado, continuar con la siguiente función
    } else {
        res.redirect('/login'); // Usuario no autenticado, redirigir al login
    }
};

// Middleware para verificar roles de usuario
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (req.session && req.session.user && roles.includes(req.session.user.rol)) {
            return next(); // Usuario tiene uno de los roles permitidos, continuar con la siguiente función
        } else {
            res.status(403).send('Acceso denegado'); // Usuario no autorizado, enviar error
        }
    };
};

// Middleware general para aplicar las verificaciones
const authMiddleware = (req, res, next) => {
    // Rutas públicas que no necesitan autenticación
    const publicRoutes = ['/', '/about', '/carta', '/gallery', '/reservar','/gracias', '/datos', '/facturar', '/login', ];

    // Si la ruta es pública, omitir la autenticación
    if (publicRoutes.includes(req.path)) {
        return next();
    }

    // Aplicar el middleware de autenticación
    isAuthenticated(req, res, next);
};

// Exportar funciones individuales
module.exports = {
    isAuthenticated,
    authorizeRoles,
    authMiddleware
};
