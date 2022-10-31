const { Rooms } = require('../../models')

const CreateRooms = async (req, res) => {
    try {
        let { name ,placesId} = req.body;

        const find = await Rooms.findAll({where:{name:name,placesId:placesId}})
        console.log(find)
        if(find.length > 0){
            return res.status(400).json('Já existe um sala cadastrado para esse local!')
        }

        const resultCreation = await Rooms.create({  name ,placesId});

        return res.status(200).json(resultCreation);
    }
    catch (err) {
        console.log('Erro create user:', err)
        return res.status(500).send();
    }
}

module.exports = { CreateRooms}