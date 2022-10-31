const express = require('express');
const { body } = require('express-validator');
const app = express.Router();

const UsersCreate = require('../controllers/Users/Create.Users');
const UsersSelect = require('../controllers/Users/Select.Users');
const UsersDelete = require('../controllers/Users/Delete.Users');
const UsersUpdate = require('../controllers/Users/Update.Users');

app.route('/users')
    .post([
            body('name').trim().notEmpty().withMessage('Nome da ação é obrigatório.'),
            body('password').trim().notEmpty().withMessage('password da ação é obrigatório.'),
            body('email').trim().notEmpty().withMessage('email da ação é obrigatório.'),

        ], UsersCreate.registerUser)
     .get(UsersSelect.getAllUsers)

app.route('/users/:id')
    .get(UsersSelect.getUserById)
    .delete(UsersDelete.disableUser)
    .put(UsersUpdate)

app.route('/admins')
    .get(UsersSelect.getAllAdministrators)
module.exports = app;