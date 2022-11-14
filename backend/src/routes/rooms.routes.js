const express = require('express');
const { body } = require('express-validator');
const app = express.Router();

const RoomsCreate = require('../controllers/Rooms/Create.Rooms');
const RoomsSelect = require('../controllers/Rooms/Select.Rooms');
const RoomsDelete = require('../controllers/Rooms/Delete.Rooms');
const RoomsUpdate = require('../controllers/Rooms/Update.Rooms');

app.route('/rooms')
    .post([
            body('name').trim().notEmpty().withMessage('Nome da ação é obrigatório.'),
            body('placeId').trim().notEmpty().withMessage('password da ação é obrigatório.'),
        ], RoomsCreate.CreateRooms)
     .get(RoomsSelect.getAllRooms)

app.route('/rooms/:id')
    .get(RoomsSelect.getAllRooms)
    .delete(RoomsDelete)
    .put(RoomsUpdate)

app.route('/place/rooms/:id')
    .get(RoomsSelect.getAllRoomsPlaces)  

module.exports = app;