const { Rooms } = require('../../models');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    try {
        // Verifica se o parametro é númerico
        if (isNaN(req.params.id)) res.status(400).json( 'O id deve ser um numérico.')

        let { name } = req.body;
        
        await Rooms.update({ name }, { where: { id: req.params.id } });
        const dbUser = await Rooms.findOne({ where: { id: req.params.id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });

        return res.status(200).send(dbUser);
    }
    catch (err) {
        console.log('Erro no update Rooms:', err)
        return res.status(500).send();
    }
}