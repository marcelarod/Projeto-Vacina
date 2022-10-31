const { Rooms, Schedules } = require('../../models')

module.exports = async (req, res) => {
    try {
        let query = await Rooms.findOne({ where: { id: req.params.id } })
        if (query == null) {
            return res.status(400).json('O id não existe na base de dados')
        }

        let querySchedules = await Schedules.findAll({ where: { roomId: query.id } })
        if (querySchedules.length >0) {
            return res.status(400).json('A sala tem agendamentos cadastrados')
        }

        await Rooms.destroy({ where: { id: req.params.id }, returning: true});
        return res.status(200).json({ message: 'Sucesso na operação' });
    } catch (err) {
        console.log('Erro Delete Rooms: ', err);
        return res.status(500).send(err);
    }
}
