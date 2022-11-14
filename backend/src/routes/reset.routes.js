const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express.Router();

const UsersUpdate = require('../controllers/Users/Update.Users');

app.route('/password/users')
    .put([
      body('password').trim().notEmpty().withMessage('Senha é obrigatoria.'),
      body('email').trim().notEmpty().withMessage('Email é obrigatorio.'),
    ], UsersUpdate.updatePassword)

module.exports = app;