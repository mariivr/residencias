const Facturacion = require('../models/facturacion');

exports.crearFacturacion = async (req, res) => {
    try {
        const { rfc, nombreReceptor, regimenFiscal, usoCFDI, codigoPostal, email } = req.body;
        const pdfRFC = req.files ? req.files.pdfRFC[0].filename : null;
        const ticketFoto = req.files ? req.files.ticketFoto[0].filename : null;

        await Facturacion.create({
            rfc,
            nombreReceptor,
            regimenFiscal,
            usoCFDI,
            codigoPostal,
            email,
            pdfRFC,
            ticketFoto
        });

        req.flash('¡Datos enviados!', 'Nos comunicaremos por email con tu factura lo más pronto posible :)');

        res.redirect('/datos'); // Redirigir a la página principal u otra página de éxito
        console.error('factura realizada', error);
    } catch (error) {
        console.error('Error al crear la facturación:', error);
        req.flash('error', 'Error al enviar los datos');
        res.status(500).send('Error al crear la facturación');
    }
};

exports.listarFacturaciones = async (req, res) => {
    try {
        const facturaciones = await Facturacion.findAll({
            order: [['id', 'DESC']] // Ordena por el ID
        });
        console.log('Facturaciones:', facturaciones);
        res.render('pages/facturaciones', { facturaciones, user: req.session.user });
    } catch (error) {
        console.error('Error al listar facturaciones:', error);
        res.status(500).send('Error al listar facturaciones');
    }
};

exports.verFacturacion = async (req, res) => {
    try {
        const id = req.params.id;
        const facturacion = await Facturacion.findByPk(id);
        if (facturacion) {
            res.render('pages/facturacionDetalle', { facturacion, user: req.session.user });
        } else {
            res.status(404).send('Factura no encontrada');
        }
    } catch (error) {
        console.error('Error al obtener la factura:', error);
        res.status(500).send('Error al obtener la factura');
    }
};

exports.marcarComoRealizada = async (req, res) => {
    try {
        const facturacionId = req.params.id;
        const realizada = req.body.realizada === 'on' ? true : false;

        await Facturacion.update(
            { realizada: realizada }, // Actualiza el campo `realizada`
            { where: { id: facturacionId } }
        );
        res.redirect('/facturaciones');
    } catch (error) {
        console.error('Error al marcar la facturación como realizada:', error);
        res.status(500).send('Error al marcar la facturación como realizada');
    }
};

exports.eliminarFacturacion = async (req, res) => {
    try {
        const facturacionId = req.params.id;
        await Facturacion.destroy({
            where: { id: facturacionId }
        });
        res.redirect('/facturaciones');
    } catch (error) {
        console.error('Error al eliminar la facturación:', error);
        res.status(500).send('Error al eliminar la facturación');
    }
};
