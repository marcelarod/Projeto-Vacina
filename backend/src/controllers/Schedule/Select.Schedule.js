const { Schedules } = require('../../models')

const getAllSchedules = async (req, res) => {
    try {
        // Consulto todos os usuários
        const dbSchedules = await Schedules.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } });
        res.status(200).send(dbSchedules);
    } catch (err) {
        console.log('Erro select all Schedules:', err)
        res.status(500).send();
    }
}

const getSchedulesById = async (req, res) => {
    try {
        let error = validationResult(req);
        let errors = error.array();
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors })
        }
        // Consulto o usuário pelo id
        const query = await Schedules.findOne({ where: { id: req.params.id }, attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } });
        if (query === null) {
            return res.status(200).json({ errors: [{  msg: 'Não existe usuario cadastrado com esse id.', location: 'body' }] })
        }
        res.status(200).send(query);
    } catch (err) {
        console.log('Erro select getSchedulesById:', err)
        res.status(500).send();
    }
}

module.exports = { getAllSchedules, getSchedulesById}
