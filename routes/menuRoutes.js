const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const Reservacion = require('../models/reservacion');
const facturacionController = require('../controllers/facturacionController');
const materialesController = require('../controllers/materialesController');
const usuariosController = require('../controllers/usuariosController');


// Middleware para asegurar que el usuario esté autenticado en todas las rutas de este archivo
// Si hay rutas públicas (como /facturar) que no deben estar protegidas, asegúrate de no aplicar el middleware a esas rutas.
router.use((req, res, next) => {
    const publicRoutes = ['/facturar', '/login', '/index', '/about', '/carta', '/gallery', '/reservar', '/gracias', '/datos', ];
    if (publicRoutes.includes(req.path)) {
        return next(); // Si la ruta es pública, omitir el middleware de autenticación
    }
    authMiddleware.isAuthenticated(req, res, next);
});

// Ruta para la página del menú
router.get('/menu', (req, res) => {
    if (req.session.user) {
        res.render('pages/menu', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});

// Ruta para la creación de un usuario
router.get('/crear-usuario', authMiddleware.authorizeRoles('admin'), (req, res) => {
    res.render('pages/api/usuarios', { user: req.session.user });
});

router.get('/getAllUsers', authMiddleware.authorizeRoles('admin'), (req, res) => {
    res.render('pages/api/usuarios', { user: req.session.user });
});

router.post('/crear-usuario', authMiddleware.authorizeRoles('admin'), usuariosController.createUser);

router.get('/editar-usuario', authMiddleware.authorizeRoles('admin'), usuariosController.getAllUsers);

router.post('/editar-usuario/:id', authMiddleware.authorizeRoles('admin'), usuariosController.updateUser);

router.post('/eliminar-usuario', authMiddleware.authorizeRoles('admin'), usuariosController.deleteUser);

// Ruta para la eliminación de usuarios
router.post('/eliminar-usuario', authMiddleware.authorizeRoles('admin'), usuariosController.deleteUser);

// Ruta para la materiales del inventario
router.get('/inventario', materialesController.mostrarMateriales);


// Rutas protegidas por rol
router.get('/corte', authMiddleware.authorizeRoles('admin'), (req, res) => {
    res.render('pages/corte', { user: req.session.user });
});

router.get('/facturaciones', authMiddleware.authorizeRoles('admin', 'gerente'), facturacionController.listarFacturaciones);
router.get('/inventario', authMiddleware.authorizeRoles('admin', 'gerente'), (req, res) => {
    res.render('pages/inventario', { user: req.session.user });
});

router.get('/reservaciones', async (req, res) => {
    if (req.session.user && req.session.user.rol === 'empleado') {
        const reservas = await Reservacion.findAll(); // Obtén las reservas desde la base de datos
        res.render('pages/reservaciones', { user: req.session.user, reservas: reservas });
    } else if (req.session.user && (req.session.user.rol === 'gerente' || req.session.user.rol === 'admin')) {
        try {
            const reservas = await Reservacion.findAll(); // Obtén las reservas desde la base de datos
            res.render('pages/reservaciones', { user: req.session.user, reservas: reservas });
        } catch (error) {
            console.error('Error al obtener las reservas:', error);
            res.status(500).send('Error al cargar las reservas');
        }
    } else {
        res.status(403).send('No tienes permiso para acceder a esta página');
    }
});

//Eliminar reservaciones
router.post('/reservaciones/eliminar', async (req, res) => {
    const { id } = req.body;
    try {
        await Reservacion.destroy({ where: { id } });
        res.redirect('/reservaciones');
    } catch (error) {
        res.status(500).send('Error al eliminar la reservación.');
    }
});

// Marcar una reservación como realizada
router.post('/reservaciones/realizar', async (req, res) => {
    const { id, realizada } = req.body;
    try {
        await Reservacion.update({ realizada: !!realizada }, { where: { id } });
        res.redirect('/reservaciones');
    } catch (error) {
        res.status(500).send('Error al actualizar la reservación.');
    }
});

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('No se pudo cerrar sesión');
        }
        res.redirect('/login');
    });
});

module.exports = router;