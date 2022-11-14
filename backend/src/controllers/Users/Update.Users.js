const { Users } = require('../../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const updateIsAdmin = async (req, res) => {
    try {
        // Verifica se o parametro é númerico
        if (isNaN(req.params.id)) res.status(400).json({ errors: [{ value: req.params.id, msg: 'O id deve ser um numérico.', param: 'id', location: 'params' }] })

        let { isAdmin } = req.body;

        // Verifica erros dentro no conteudo do corpo da requisição
        let error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }

        // Verifico se existe usuario
        let queryUsers = await Users.findOne({ where: { id: req.params.id } })
        if (queryUsers == null) {
            return res.status(400).json({ errors: [{ value: req.params.id, msg: 'Id não encontrando na base de dados.', param: 'id', location: 'params' }] })
        }
        
        // Atualiza o usuário se ele é admin ou não.
        const dbUser = await Users.update({ isAdmin }, { where: { id: req.params.id } });

        return res.status(200).send(dbUser);
    }
    catch (err) {
        console.log('Erro no update user:', err)
        return res.status(500).send();
    }
}

const updatePassword = async (req, res) => {
    try {

        let { password, email } = req.body;

        var senhaBcrypt = password
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(senhaBcrypt, salt)

        // Verifico se existe usuario
        let queryUsers = await Users.findOne({ where: { email: email } })
        if (queryUsers == null) {
            return res.status(400).json('Usuario não existe !')
        }
        
        // se existir altera a senha 
        const dbUser = await Users.update({ password:hash }, { where: { id: queryUsers.id } });

        return res.status(200).send(dbUser);
    }
    catch (err) {
        console.log('Erro no update user:', err)
        return res.status(500).send();
    }
}

module.exports = { updateIsAdmin, updatePassword}
