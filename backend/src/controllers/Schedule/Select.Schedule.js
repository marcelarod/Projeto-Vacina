const { Schedules, Places, Rooms,Users } = require('../../models')
var moment = require('moment');
const { Op } = require('sequelize');

const getAllSchedules = async (req, res) => {
    try {
        // Consulto todos
        const dbSchedules = await Schedules.findAll({
            include: [
                {
                    model: Rooms,
                    as: 'Rooms',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include:[
                        {
                            model:Places,
                            as: 'Places',
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        },
                    ],
                },
                {
                    model: Users,
                    as: 'Users',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                }
            ],
             attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } 
            });
        res.status(200).send(dbSchedules);
    } catch (err) {
        console.log('Erro select all Schedules:', err)
        res.status(500).send();
    }
}


const getAllSchedulesWithNotVaccination = async (req, res) => {
    try {
        // Consulto todos
        const dbSchedules = await Schedules.findAll({
            include: [
                {
                    model: Rooms,
                    as: 'Rooms',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include:[
                        {
                            model:Places,
                            as: 'Places',
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        },
                    ],
                },
                {
                    model: Users,
                    as: 'Users',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                }
            ],
             where:{
                isVaccinated:false
            },
             attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } 
            });
        res.status(200).send(dbSchedules);
    } catch (err) {
        console.log('Erro select all Schedules:', err)
        res.status(500).send();
    }
}


const getSchedulesById = async (req, res) => {
    try {
        // Consulto pelo id
        const query = await Schedules.findOne({ 
            include: [
                {
                    model: Rooms,
                    as: 'Rooms',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include:[
                        {
                            model:Places,
                            as: 'Places',
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        },
                    ],
                },
                {
                    model: Users,
                    as: 'Users',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                }
            ],
            where: { id: req.params.id }, 
            attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } });
        if (query === null) {
            return res.status(200).json({ errors: [{ msg: 'Não existe usuario cadastrado com esse id.', location: 'body' }] })
        }
        res.status(200).send(query);
    } catch (err) {
        console.log('Erro select getSchedulesById:', err)
        res.status(500).send();
    }
}


module.exports = { getAllSchedules, getSchedulesById, getAllSchedulesWithNotVaccination}
