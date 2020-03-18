const express = require('express');
const router = express.Router();
const { Game, Type, Mechanic } = require('../models/index.js')

const GameController = {
    getAll(req, res) {
        Game.findAll({ include: [Type, Mechanic] })
            .then(games => res.send(games))
            .catch(err => res.send('Ha habido problemas al tratar de obtener los juegos.'))
    },
    findOne(req, res) {
        Game.findOne({
                where: { id: req.params.id },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then(game => res.send(game))
            .catch(err => res.send('Ha habido problemas al tratar de obtener los juegos.'))

    },
    insert(req, res) {
        Game.create({
                name: req.body.name,
                year: req.body.year,
                image: req.body.image,
                minPlayer: req.body.minPlayer,
                maxPlayer: req.body.maxPlayer,
                time: req.body.time,
                age: req.body.age,
                description: req.body.description,
            })
            .then(game => {
                game.addType(req.body.TypeId);
                game.addMechanic(req.body.MechanicId);
                res.send(game);

            })
            .catch(err => {
                console.log(err);
                res.send('Ha habido problemas al tratar de actualizar el juego.')
            })
    },
    put(req, res) {
        Game.update({...req.body }, { where: { id: req.params.id } })
            .then(game = Game.findByPk(req.params.id))
            .then(game => res.status(200).send(game))
            .catch(err => res.send('Ha habido problemas al tratar de actualizar el juego.'))
    },
    delete(req, res) {
        Game.destroy({ where: { id: req.params.id } })
            .then(() => res.send('Juego eliminado.'))
            .catch(err => res.send('Ha habido problemas al tratar de eliminar el juego.'))
    }
}
module.exports = GameController;