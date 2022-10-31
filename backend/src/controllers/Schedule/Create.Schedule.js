const { Schedules } = require('../../models')

const registerSchedule = async (req, res) => {
    try {
        let { name, roomId, date} = req.body;
        
        const resultCreation = await Schedules.create({ name, roomId, date});
        return res.status(200).json(resultCreation);
    }
    catch (err) {
        console.log('Erro create Schedules:', err)
        return res.status(500).send();
    }
}

module.exports = { registerSchedule }