const Material = require('../models/material');


// Agregar un nuevo material
exports.agregarMaterial = async (req, res) => {
    try {
        const { material, cantidad } = req.body;
        console.log('Datos recibidos:', { material, cantidad }); // Añade esto para depuración

        // Crear nuevo material en la base de datos
        await Material.create({ material, cantidad });

        res.status(201).json({ message: 'Material agregado exitosamente.' });
    } catch (error) {
        console.error('Error al agregar el material:', error); // Mejora el mensaje de error
        res.status(500).json({ message: 'Error al agregar el material.' });
    }
};

exports.mostrarMateriales = async (req, res) => {
    try {
        const materiales = await Material.findAll(); // Obtén todos los materiales de la base de datos
        const user = req.user || {}; // Asegúrate de que `user` esté definido, si existe
        res.render('pages/inventario', { materiales: materiales,  user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los materiales' });
    }
};

exports.eliminarMaterial = async (req, res) => {
    try {
        const materialId = req.params.id;
        await Material.destroy({
            where: { id: materialId }
        });
        res.redirect('/inventario'); // Redirige a la página de inventario después de eliminar
    } catch (error) {
        console.error('Error al eliminar el material:', error);
        res.status(500).send('Error al eliminar el material');
    }
};




exports.modificarMaterial = async (req, res) => {
    try {
        const materialId = req.params.id;
        const { material, cantidad } = req.body;

        await Material.update({ material, cantidad }, {
            where: { id: materialId }
        });

        res.redirect('/inventario');
    } catch (error) {
        console.error('Error al modificar el material:', error);
        res.status(500).send('Error al modificar el material');
    }
};

