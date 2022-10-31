const { Users } = require('../../models')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        var senhaBcrypt = password
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(senhaBcrypt, salt)
      
        // Verifico se existe algum erro no corpo da requisição
        let error = validationResult(req);
        const errors = error.array()

        // Verifico se já existe alguém com o e-mail 
        const findEmail = await Users.findAll({ where: { email: email } });
        if (findEmail.length > 0) errors.push({ value: email, msg: 'Já existe usuário cadastrado com esse email.', param: 'email', location: 'body' })

        // Caso erro envio mensagem
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors })
        }

        const resultCreation = await Users.create({ name, email,password:hash, isAdmin:false, isActive: true });

        return res.status(200).json(resultCreation);
    }
    catch (err) {
        console.log('Erro create user:', err)
        return res.status(500).send();
    }
}




module.exports = { registerUser }