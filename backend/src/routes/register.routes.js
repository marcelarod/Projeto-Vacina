const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express.Router();

const UsersCreate = require('../controllers/Users/Create.Users');
const recaptcha = require('../middlewares/recaptcha');

app.route('/users')
    .post(
      recaptcha.handleCaptch,
      [
          body('name').trim().notEmpty().withMessage('Nome da ação é obrigatório.'),
          body('password').trim().notEmpty().withMessage('password da ação é obrigatório.'),
          body('email').trim().notEmpty().withMessage('email da ação é obrigatório.'),

      ], UsersCreate.registerUser)


module.exports = app;