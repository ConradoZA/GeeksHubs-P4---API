const express = require('express');
const router = express.Router();
const { Game, Type, Mechanic, Author, Artist, sequelize } = require('../models/index.js')

const GameController = {
    getAll(req, res) {
        Game.findAll({ include: [Type, Mechanic, Author, Artist] })
            .then(games => res.send(games))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los juegos.'))
    },
    getOne(req, res) {
        Game.findOne({
                include: [Type, Mechanic, Author, Artist],
                where: { id: req.params.id }
            })
            .then(game => res.send(game))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los juegos.'))

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
                description: req.body.description
            })
            .then(game => {
                game.addType(req.body.TypeId);
                game.addMechanic(req.body.MechanicId);
                game.addAuthor(req.body.AuthorId);
                game.addArtist(req.body.ArtistId);
                res.send(game);

            })
            .catch(err => {
                console.log(err);
                res.status(500).send('Ha habido problemas al tratar de actualizar el juego.')
            })
    },
    put(req, res) {
        Game.update({...req.body }, { where: { id: req.params.id } })
            .then(game => Game.findByPk(req.params.id))
            .then(game => {
                if (req.body.TypeId) {
                    sequelize.query(`DELETE FROM TypeGames where GameId = ${game.id}`);
                    game.addType(req.body.TypeId);
                }
                if (req.body.MechanicId) {
                    sequelize.query(`DELETE FROM MechanicGames where GameId = ${game.id}`);
                    game.addMechanic(req.body.MechanicId);
                }
                if (req.body.AuthorId) {
                    sequelize.query(`DELETE FROM AuthorGames where GameId = ${game.id}`);
                    game.addAuthor(req.body.AuthorId);
                }
                if (req.body.ArtistId) {
                    sequelize.query(`DELETE FROM ArtistGames where GameId = ${game.id}`);
                    game.addArtist(req.body.ArtistId);
                }
                res.status(200).send(game)
            })
            .catch(err => res.status(500).send('Ha habido problemas al tratar de actualizar el juego.'))
    },
    delete(req, res) {
        Game.destroy({ where: { id: req.params.id } })
            .then(() => res.send('Juego eliminado.'))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de eliminar el juego.'))
    }
}
module.exports = GameController;