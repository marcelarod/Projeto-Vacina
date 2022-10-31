const { Users } = require('../../models')

const disableUser = async (req, res) => {
    try {
        // Verifico se o parametro é numerico
        if (isNaN(req.params.id)) res.status(400).json({ errors: [{ value: req.params.id, msg: 'O id deve ser um numérico.', param: 'id', location: 'params' }] })

        // Atualizo a entrada desativando a entrada
        await Users.update({ isActive: false }, { where: { id: req.params.id }});

        res.status(200).json({ message: 'Sucesso na operação' });
    } catch (err) {
        console.log('Erro no delete disableUser:', err)
        return res.status(500).send();
    }
}


module.exports = { disableUser }