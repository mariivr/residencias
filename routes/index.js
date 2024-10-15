const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas públicas
router.get('/', (req, res) => res.render('index'));
router.get('/about', (req, res) => res.render('pages/about'));
router.get('/carta', (req, res) => res.render('pages/carta'));
router.get('/gallery', (req, res) => res.render('pages/gallery'));
router.get('/reservar', (req, res) => res.render('pages/reservar'));
router.get('/facturar', (req, res) => res.render('pages/facturar'));
router.get('/gracias', (req, res) => res.render('pages/gracias'));
router.get('/datos', (req, res) => res.render('pages/datos'));
router.get('/login', (req, res) => res.render('pages/login'));

// Ruta de login
router.post('/login', authController.login);

module.exports = router;
