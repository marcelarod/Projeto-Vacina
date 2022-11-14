const { Places, Rooms, Schedules } = require('../../models')
const { validationResult } = require('express-validator');
var moment = require('moment');

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

const getAllPlacesWithReserved = async (req, res) => {
    try {
        // Consulto todos os usuários
        const querySchedules = await Schedules.findAll({
            include: [
                {
                    model: Rooms,
                    as: 'Rooms',
                    include: [
                        {
                            model: Places,
                            as: 'Places',
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        },
                    ],
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },

            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            order: [['id', 'ASC']]
        });

        let result = querySchedules.filter(e => {
            let startReserved =moment.tz(new Date(req.params.initialdate), "America/Sao_Paulo").format("YYYY-MM-DD")
            let startEnd =moment.tz(new Date(req.params.initialdate), "America/Sao_Paulo").add(1, 'days').format("YYYY-MM-DD")

            var Start = moment(e.startTime).format("YYYY-MM-DD")
            var End = moment(e.endTime).format("YYYY-MM-DD")

            return (
                Start >= startReserved &&  End <= startEnd
            )
        })

        res.status(200).send(result);

    } catch (err) {
        console.log('Erro select all places:', err)
        res.status(500).send();
    }
}
module.exports = { getAllPlaces, getUserByPlaces, getAllPlacesWithReserved}
