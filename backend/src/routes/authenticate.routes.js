const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express.Router();

const authenticate = require('../controllers/Login/Login');
const recaptcha = require('../middlewares/recaptcha');

app.route('/auth')
    .post(
        recaptcha.handleCaptch,
        [
            body('email').isEmail().withMessage('Email está no formato errado.'),
            body('password').trim().notEmpty().withMessage('Senha é obrigatório.')
        ], authenticate.getAuth)



module.exports = app;