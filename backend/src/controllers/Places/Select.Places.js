const { Places } = require('../../models')
const { validationResult } = require('express-validator');

const getAllPlaces = async (req, res) => {
    try {
        // Consulto todos os usuários
        const dbUsers = await Places.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
        res.status(200).send(dbUsers);
    } catch (err) {
        console.log('Erro select all places:', err)
        res.status(500).send();
    }
}

const getUserByPlaces = async (req, res) => {
    try {
        let error = validationResult(req);
        let errors = error.array();
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors })
        }
        // Consulto o usuário pelo id
        const query = await Places.findOne({ where: { id: req.params.id }, attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } });
        if (query === null) {
            return res.status(200).json('Não existe usuario cadastrado com esse id')
        }
        res.status(200).send(query);
    } catch (err) {
        console.log('Erro select getUserByPlaces:', err)
        res.status(500).send();
    }
}


module.exports = { getAllPlaces, getUserByPlaces}
