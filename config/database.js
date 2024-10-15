const { Sequelize } = require('sequelize');

// Configuración de la conexión para la instancia de Sequelize
const sequelize = new Sequelize('once_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida con éxito.');
        await sequelize.sync(); // Asegúrate de sincronizar el modelo
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
})();
// Exportar la instancia de Sequelize para su uso en los modelos
module.exports = sequelize;

