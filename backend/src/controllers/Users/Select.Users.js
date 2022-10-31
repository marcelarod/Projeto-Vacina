const { Users } = require('../../models')
const { validationResult } = require('express-validator');

const getAllUsers = async (req, res) => {
    try {
        // Consulto todos os usuários
        const dbUsers = await Users.findAll({ where: { isActive: true }, attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } });
        res.status(200).send(dbUsers);
    } catch (err) {
        console.log('Erro select all user:', err)
        res.status(500).send();
    }
}

const getUserById = async (req, res) => {
    try {
        let error = validationResult(req);
        let errors = error.array();
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors })
        }
        // Consulto o usuário pelo id
        const query = await Users.findOne({ where: { id: req.params.id }, attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } });
        if (query === null) {
            return res.status(200).json({ errors: [{  msg: 'Não existe usuario cadastrado com esse id.', location: 'body' }] })
        }
        res.status(200).send(query);
    } catch (err) {
        console.log('Erro select getUserById:', err)
        res.status(500).send();
    }
}

const getAllAdministrators = async (req, res) => {
    try {
        // Consulta os usuários que está com a flag isAdmin = true
        const query = await Users.findAll({ where: { isAdmin: true, isActive: true }, attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } });
        return res.status(200).send(query);
    } catch (err) {
        console.log('Erro no select getAllAdministrators:', err)
        return res.status(500).send();
    }
}

const identify = async (req, res, next) => {
    try {
        let result = {
            userId: null,
            email: '',
            name: '',
            isAdmin: false,
            isApprover: false,
        }
        // Verifica se ele é Admin
        let queryAdmin = await Users.findAll({
            where: {
                id: req.decoded.id
            }
        })
        queryAdmin.map(e => {
            result.userId = e.id
            result.email = e.email
            result.name = e.name
            result.isAdmin =  e.isAdmin
        })        

        // Verifica se é aprovador de site
        let queryApproverSites = await SiteApprovers.findAll({
            where: {
               approverId: result.userId
            }
        })

        if (queryApproverSites.length > 0) {
            result.isApprover = true
        }

        return res.status(200).json(result)
    } catch (err) {
        console.log('Erro Identify:', err)
        return res.status(500).send()
    }
}

module.exports = { getAllUsers, getUserById, getAllAdministrators,identify}
