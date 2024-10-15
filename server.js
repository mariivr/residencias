const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const sequelize = require('./config/database');

// Importar rutas
const indexRoutes = require('./routes/index');
const menuRoutes = require('./routes/menuRoutes');
const materiales = require('./routes/materiales')
const facturacionRoutes = require('./routes/facturacionRoutes');
const reservacionRoutes = require('./routes/reservacionRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

// Importar middleware de autenticación
const { authMiddleware } = require('./middleware/authMiddleware');

const PORT = process.env.PORT || 3000;

// Configuración de la sesión
app.use(session({
    secret: 'mi-secreto', // Cambia esto por una clave secreta más segura
    resave: false,
    saveUninitialized: true,
}));

// Configurar connect-flash
app.use(flash());

// Configuración de body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de la vista
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ajuste de la ruta de vistas

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde la carpeta 'public'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar rutas públicas
app.use((req, res, next) => {
    const publicRoutes = ['/reservar', '/gracias', '/datos', '/login', '/about', '/carta', '/gallery', '/facturar', ];

    // Permitir acceso a rutas públicas
    if (publicRoutes.includes(req.path)) {
        return next();
    }

    // Aplicar el middleware de autenticación para rutas protegidas
    authMiddleware(req, res, next);
});

// Rutas
app.use('/', indexRoutes);
app.use('/', menuRoutes);
app.use('/api/materiales', materiales);
app.use('/api/usuarios', usuariosRoutes);
app.use('/', facturacionRoutes);
app.use('/', reservacionRoutes);


// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
