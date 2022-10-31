const { Rooms, Places } = require('../../models')
const { validationResult } = require('express-validator');

const getAllRooms = async (req, res) => {
    try {
        // Consulto todos os usuários
        const dbUsers = await Rooms.findAll({ 
            include:[
                {
                    model:Places,
                    as: 'Places',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
            ],
            attributes: { exclude: ['createdAt', 'updatedAt', 'password'] 
        } });
        res.status(200).send(dbUsers);
    } catch (err) {
        console.log('Erro select all user:', err)
        res.status(500).send();
    }
}

const getRoomsById = async (req, res) => {
    try {
        let error = validationResult(req);
        let errors = error.array();
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors })
        }
        // Consulto o usuário pelo id
        const query = await Rooms.findOne({ where: { id: req.params.id }, attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } });
        if (query === null) {
            return res.status(200).json({ errors: [{  msg: 'Não existe usuario cadastrado com esse id.', location: 'body' }] })
        }
        res.status(200).send(query);
    } catch (err) {
        console.log('Erro select getUserById:', err)
        res.status(500).send();
    }
}

module.exports = { getAllRooms, getRoomsById}
