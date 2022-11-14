const { Users } = require('../../models')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;

const getAuth = async (req, res) => {
    var email = req.body.email
    var senha = req.body.password
    try {
       
        const responseUsers = await Users.findOne({ where: { email: email }, raw: true })
        if (responseUsers == null) {
            return res.status(400).send('Usuário não encontrado!');

        }
        let correct = bcrypt.compareSync(senha, responseUsers.password); // comparando a senha passada com a senha no banco de dados
        if (!correct) {
            return res.status(400).send('Senha inválida!');
        }
        // Validar senha
        const token = jwt.sign({
            id: responseUsers.id,
            nome: responseUsers.name,
            email: responseUsers.email,
        }, SECRET, { expiresIn: '6h' })
        
        let now = new Date();
        let time = now.getTime();
        time += 3600 * 1000;
        console.log(time)
        res.cookie("token",token,{ httpOnly: false, maxAge:time});
        
        return res.status(200).json({token:token });
    } catch (err) {
        console.log('Erro:', err)
        return res.status(500).send();
    }
}

module.exports = { getAuth }