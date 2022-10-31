const express = require('express');
const { body } = require('express-validator');
const app = express.Router();

const PlacesCreate = require('../controllers/Places/Create.Places');
const PlacesSelect = require('../controllers/Places/Select.Places');
const PlacesDelete = require('../controllers/Places/Delete.Places');
const PlacesUpdate = require('../controllers/Places/Update.Places');

app.route('/places')
    .post([
            body('name').trim().notEmpty().withMessage('Nome da ação é obrigatório.'),
        ], PlacesCreate.CreatePlaces)
     .get(PlacesSelect.getAllPlaces)

app.route('/places/:id')
    .get(PlacesSelect.getAllPlaces)
    .delete(PlacesDelete)
    .put(PlacesUpdate)


module.exports = app;