const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Facturacion = require('../models/facturacion'); // Ajusta la ruta según tu estructura de proyecto
const facturacionController = require('../controllers/facturacionController');

// Configuración de multer para manejo de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Ruta para manejar el formulario de facturación
router.post('/facturar', upload.fields([{ name: 'pdfRFC' }, { name: 'ticketFoto' }]), (req, res) => {
    const { rfc, nombreReceptor, regimenFiscal, usoCFDI, codigoPostal, email } = req.body;
    const pdfRFC = req.files['pdfRFC'] ? req.files['pdfRFC'][0].filename : null;
    const ticketFoto = req.files['ticketFoto'] ? req.files['ticketFoto'][0].filename : null;

    Facturacion.create({
        rfc,
        nombreReceptor,
        regimenFiscal,
        usoCFDI,
        codigoPostal,
        email,
        pdfRFC,
        ticketFoto
    })
    .then(() => {
        req.flash('messages', 'Factura enviada con éxito.');
        res.redirect('/datos');
    })
    .catch(err => {
        console.error('Error al guardar la factura:', err);
        req.flash('messages', 'Hubo un error al enviar la factura.');
        res.redirect('/facturar');
    });
});

router.post('/facturaciones/:id/realizar', facturacionController.marcarComoRealizada);

router.get('/facturaciones', facturacionController.listarFacturaciones);

router.get('/facturaciones/:id', facturacionController.verFacturacion);

router.post('/facturaciones/:id/eliminar', facturacionController.eliminarFacturacion);

module.exports = router;
