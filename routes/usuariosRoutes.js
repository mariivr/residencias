const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController'); 

// Rutas
router.get('/', usuariosController.getAllUsers); 
router.post('/crear', usuariosController.createUser);
router.delete('/usuarios/:username', usuariosController.deleteUser);
router.post('/editar/:id', usuariosController.updateUser);

module.exports = router;
