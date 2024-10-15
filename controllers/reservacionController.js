const Reservacion = require('../models/reservacion'); // Asegúrate de ajustar la ruta según la estructura de tu proyecto

exports.createReservacion = async (req, res) => {
    const { nombre, email, telefono, fecha, hora, personas } = req.body;

    // Imprimir los datos recibidos para depuración
    console.log('Datos recibidos:', { nombre, email, telefono, fecha, hora, personas });

    // Verificar que todos los campos están presentes
    if (!nombre || !email||!telefono || !fecha || !hora || !personas) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        // Crear la nueva reservación en la base de datos
        const nuevaReservacion = await Reservacion.create({
            nombre,
            email,
            telefono,
            fecha,
            hora,
            personas
        });
        res.redirect('/gracias');


    } catch (error) {
        console.error('Error al crear la reservación:', error);
        res.status(500).send('Ocurrió un error al procesar su reservación');
    }
};

exports.getReservaciones = async (req, res) => {
    try {
        const reservas = await Reservacion.findAll();
        res.render('pages/reservaciones', { reservas }); // Solo pasar las reservas sin filtrar
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).send('Error al cargar las reservas');
    }
};

exports.deleteReservacion = async (req, res) => {
    try {
        const id = req.body.id;
        await Reservacion.destroy({ where: { id } });
        res.redirect('/reservaciones');
    } catch (error) {
        res.status(500).send('Error al eliminar reservación.');
    }
};

exports.markAsRealizada = async (req, res) => {
    try {
        const id = req.body.id;
        await Reservacion.update({ realizada: true }, { where: { id } });
        res.redirect('/reservaciones');
    } catch (error) {
        res.status(500).send('Error al marcar como realizada.');
    }
};