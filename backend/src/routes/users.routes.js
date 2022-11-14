const express = require('express');
const { body } = require('express-validator');
const app = express.Router();

const UsersSelect = require('../controllers/Users/Select.Users');
const UsersDelete = require('../controllers/Users/Delete.Users');
const UsersUpdate = require('../controllers/Users/Update.Users');

app.route('/users')
     .get(UsersSelect.getAllUsers)

app.route('/users/:id')
    .get(UsersSelect.getUserById)
    .delete(UsersDelete.disableUser)
    .put(UsersUpdate.updateIsAdmin)

app.route('/admins')
    .get(UsersSelect.getAllAdministrators)

app.route('/identify')
    .get(UsersSelect.identify)


    
module.exports = app;