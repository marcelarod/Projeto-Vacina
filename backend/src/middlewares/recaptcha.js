require('dotenv').config();
const { validationResult } = require('express-validator');

const axios = require('axios')
const handleCaptch = async (req, res, next) => {
    try {
        if (!req.query.recaptcha) {
            return res.status(400).send('Recaptcha não foi encontrado nos parametros');
        }
        let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_KEY}&response=${req.query.recaptcha}`)

        if (response.data.success !== true) {
            return res.status(400).send('Recaptcha não foi encontrado nos parametros');
        }
        next()
    } catch (err) {
        console.log(err)
        return res.status(400).send('Recptch não válido, tente novamente');
    }
}

module.exports = { handleCaptch }