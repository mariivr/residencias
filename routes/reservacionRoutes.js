const express = require('express');
const router = express.Router();
const reservacionController = require('../controllers/reservacionController'); // Asegúrate de que la ruta sea correcta

// Ruta para manejar la creación de una nueva reservación
router.post('/reservar', reservacionController.createReservacion);

router.get('/gracias', (req, res) => {
    res.render('gracias');  // Si usas EJS
});


router.get('/reservaciones', reservacionController.getReservaciones);

router.post('/eliminar', reservacionController.deleteReservacion);

router.post('/realizar', reservacionController.markAsRealizada);



module.exports = router;
