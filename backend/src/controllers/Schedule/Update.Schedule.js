const { Schedules } = require('../../models');

module.exports = async (req, res) => {
    try {
        // Verifica se o parametro é númerico
        if (isNaN(req.params.id)) res.status(400).json({ errors: [{ value: req.params.id, msg: 'O id deve ser um numérico.', param: 'id', location: 'params' }] })

        let { isVaccinated} = req.body;
        
        await Schedules.update({ isVaccinated }, { where: { id: req.params.id } });
        const dbSchedules = await Schedules.findOne({ where: { id: req.params.id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });

        return res.status(200).send(dbSchedules);
    }
    catch (err) {
        console.log('Erro no update Schedules:', err)
        return res.status(500).send();
    }
}