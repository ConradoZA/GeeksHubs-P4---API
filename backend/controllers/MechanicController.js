const express = require('express');
const router = express.Router();
const { Game, Mechanic, sequelize } = require('../models/index.js')

const MechanicController = {
    getAll(req, res) {
        Mechanic.findAll({ include: [Game] })
            .then(mechanics => res.send(mechanics))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener las mecánicas de juego.'))
    },
    getOne(req, res) {
        Mechanic.findOne({
                include: [Game],
                where: { id: req.params.id }
            })
            .then(mechanic => res.send(mechanic))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener la mecánica de juego.'))
    },
    insert(req, res) {
        Mechanic.create({
                name: req.body.name
            })
            .then(mechanic => res.status(201).send(mechanic))
            .catch(err => {
                console.log(err);
                res.status(500).send('Ha habido problemas al tratar de crear la mecánica de juego.')
            })
    },
    insertMany(req, res) {
        Mechanic.bulkCreate([...req.body])
            .then(mechanic => res.status(201).send("Hecho!"))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de crear las mecánicas de juego.'))
    },
    put(req, res) {
        Mechanic.update({...req.body }, { where: { id: req.params.id } })
            .then(mechanic => Mechanic.findByPk(req.params.id))
            .then(mechanic => {
                res.status(200).send(mechanic)
            })
            .catch(err => res.status(500).send('Ha habido problemas al tratar de actualizar la mecánica de juego.'))
    },
    delete(req, res) {
        Mechanic.destroy({ where: { id: req.params.id } })
            .then(() => sequelize.query(`DELETE FROM MechanicGames where MechanicId = ${req.params.id}`))
            .then(() => res.status(200).send('Mecánica eliminada.'))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de eliminar la mecánica de juego.'))
    }
}
module.exports = MechanicController;