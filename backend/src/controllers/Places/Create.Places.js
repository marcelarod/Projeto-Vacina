const { Places } = require('../../models')

const CreatePlaces = async (req, res) => {
    try {
        let { name } = req.body;

        const findPlaces = await Places.findAll({where:{name: name}})
        console.log(findPlaces)
        if(findPlaces.length > 0){
            return res.status(400).json('Já existe um local cadastrado!')
        }

        const resultCreation = await Places.create({ name});

        return res.status(200).json(resultCreation);
    }
    catch (err) {
        console.log('Erro create user:', err)
        return res.status(500).send();
    }
}

module.exports = { CreatePlaces}