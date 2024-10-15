const express = require('express');
const router = express.Router();
const materialesController = require('../controllers/materialesController');

// Ruta para agregar un nuevo material
router.post('/', materialesController.agregarMaterial);

// Ruta para obtener todos los materiales (opcional)
router.post('/', materialesController.agregarMaterial);

router.post('/eliminar-material/:id', materialesController.eliminarMaterial);
router.post('/modificar-material/:id', materialesController.modificarMaterial);



module.exports = router;
