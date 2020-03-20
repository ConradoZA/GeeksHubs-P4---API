const express = require('express');
const router = express.Router();
const { Game, Type, sequelize } = require('../models/index.js')

const TypeController = {
    getAll(req, res) {
        Type.findAll({ include: [Game] })
            .then(types => res.send(types))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los tipos de juego.'))
    },
    getOne(req, res) {
        Type.findOne({
                include: [Game],
                where: { id: req.params.id }
            })
            .then(type => res.send(type))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener el tipo de juego.'))

    },
    insert(req, res) {
        Type.create({
                name: req.body.name
            })
            .then(type => res.status(201).send(type))
            .catch(err => {
                console.log(err);
                res.status(500).send('Ha habido problemas al tratar de crear el tipo de juego.')
            })
    },
    insertMany(req, res) {
        Type.bulkCreate([...req.body])
            .then(type => res.status(201).send("Hecho!"))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de crear los tipos de juego.'))
    },
    put(req, res) {
        Type.update({...req.body }, { where: { id: req.params.id } })
            .then(type => type.findByPk(req.params.id))
            .then(type => {
                res.status(200).send(type)
            })
            .catch(err => res.status(500).send('Ha habido problemas al tratar de actualizar el tipo de juego.'))
    },
    delete(req, res) {
        Type.destroy({ where: { id: req.params.id } })
            .then(() => sequelize.query(`DELETE FROM TypeGames where TypeId = ${req.params.id}`))
            .then(() => res.status(200).send('Tipo eliminado.'))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de eliminar el tipo de juego.'))
    }
}
module.exports = TypeController;