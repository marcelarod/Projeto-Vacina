const { Places, Rooms } = require('../../models')

module.exports = async (req, res) => {
    try {
        let query = await Places.findOne({ where: { id: req.params.id } })
        if (query == null) {
            return res.status(400).json('O id não existe na base de dados')
        }
        let queryRooms = await Rooms.findAll({ where: { placesId: query.id } })
        if (queryRooms.length >0) {
            return res.status(400).json('O Local tem salas cadastradas')
        }

        await Places.destroy({ where: { id: req.params.id }, returning: true});
        return res.status(200).json({ message: 'Sucesso na operação' });
    } catch (err) {
        console.log('Erro Delete Places: ', err);
        return res.status(500).send(err);
    }
}
