const express = require('express');
const { body } = require('express-validator');
const app = express.Router();

const ScheduleCreate = require('../controllers/Schedule/Create.Schedule');
const ScheduleSelect = require('../controllers/Schedule/Select.Schedule');
const ScheduleDelete = require('../controllers/Schedule/Delete.Schedule');
const ScheduleUpdate = require('../controllers/Schedule/Update.Schedule');

app.route('/schedule')
    .post([
            body('name').trim().notEmpty().withMessage('Nome da ação é obrigatório.'),
            body('roomId').trim().notEmpty().withMessage('Nome da ação é obrigatório.'),
            body('date').trim().notEmpty().withMessage('Nome da ação é obrigatório.'),

        ], ScheduleCreate.registerSchedule)
     .get(ScheduleSelect.getAllSchedules)

app.route('/schedule/:id')
    .get(ScheduleSelect.getSchedulesById)
    .delete(ScheduleDelete)
    .put(ScheduleUpdate)

app.route('/schedules/notVaccination')
    .get(ScheduleSelect.getAllSchedulesWithNotVaccination)


module.exports = app;