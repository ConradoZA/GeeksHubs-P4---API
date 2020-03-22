const express = require('express');
const router = express.Router();
const { Game, Type, Mechanic, Author, Artist, sequelize, Sequelize } = require('../models/index.js')
const { Op } = Sequelize;

const SearchController = {
    getByName(req, res) {
        Game.findAll({
                include: [Type, Mechanic, Author, Artist],
                where: {
                    name: {
                        [Op.like]: `%${req.params.game}%`
                    }
                },
                order: [
                    ['name', 'ASC'],
                    [models.Type, 'name', 'ASC'],
                    [models.Mechanic, 'name', 'ASC'],
                    [models.Author, 'name', 'ASC'],
                    [models.Artist, 'name', 'ASC']
                ]
            })
            .then(games => res.send(games))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los juegos.'))
    },
    getByYear(req, res) {
        Game.findAll({
                include: [Type, Mechanic, Author, Artist],
                where: { year: req.params.year },
                order: [
                    ['name', 'ASC'],
                    [models.Type, 'name', 'ASC'],
                    [models.Mechanic, 'name', 'ASC'],
                    [models.Author, 'name', 'ASC'],
                    [models.Artist, 'name', 'ASC']
                ]
            })
            .then(games => res.send(games))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los juegos.'))

    },
    getByPlayers(req, res) {
        Game.findAll({
                include: [Type, Mechanic, Author, Artist],
                where: {
                    [Op.and]: [{
                        maxPlayer: {
                            [Op.gte]: req.params.player
                        }
                    }, {
                        minPlayer: {
                            [Op.lte]: req.params.player
                        }
                    }]
                },
                order: [
                    ['name', 'ASC'],
                    [models.Type, 'name', 'ASC'],
                    [models.Mechanic, 'name', 'ASC'],
                    [models.Author, 'name', 'ASC'],
                    [models.Artist, 'name', 'ASC']
                ]
            })
            .then(games => res.send(games))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los juegos.'))
    },
    getMechanicByName(req, res) {
        Mechanic.findAll({
                include: [Game],
                where: {
                    name: {
                        [Op.like]: `%${req.params.mechanic}%`
                    }
                },
                order: [
                    ['name', 'ASC'],
                    [models.Game, 'name', 'ASC']
                ]
            })
            .then(mechanics => res.send(mechanics))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener las mecánicas de juego.'))
    },
    getMechanicById(req, res) {
        Mechanic.findAll({
                include: [Game],
                where: { id: req.params.id },
                order: [
                    ['name', 'ASC'],
                    [models.Game, 'name', 'ASC']
                ]
            })
            .then(mechanics => res.send(mechanics))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener las mecánicas de juego.'))
    },
    getTypeByName(req, res) {
        Type.findAll({
                include: [Game],
                where: {
                    name: {
                        [Op.like]: `%${req.params.type}%`
                    }
                },
                order: [
                    ['name', 'ASC'],
                    [models.Game, 'name', 'ASC']
                ]
            })
            .then(types => res.send(types))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los tipos de juego.'))
    },
    getTypeById(req, res) {
        Type.findAll({
                include: [Game],
                where: { id: req.params.id },
                order: [
                    ['name', 'ASC'],
                    [models.Game, 'name', 'ASC']
                ]
            })
            .then(types => res.send(types))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los tipos de juego.'))
    },
    getAuthorByName(req, res) {
        Author.findAll({
                include: [Game],
                where: {
                    name: {
                        [Op.like]: `%${req.params.author}%`
                    }
                },
                order: [
                    ['name', 'ASC'],
                    [models.Game, 'name', 'ASC']
                ]
            })
            .then(authors => res.send(authors))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los autores.'))
    },
    getAuthorById(req, res) {
        Author.findAll({
                include: [Game],
                where: { id: req.params.id },
                order: [
                    ['name', 'ASC'],
                    [models.Game, 'name', 'ASC']
                ]
            })
            .then(authors => res.send(authors))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los autores.'))
    },
    getArtistByName(req, res) {
        Artist.findAll({
                include: [Game],
                where: {
                    name: {
                        [Op.like]: `%${req.params.artist}%`
                    }
                },
                order: [
                    ['name', 'ASC'],
                    [models.Game, 'name', 'ASC']
                ]
            })
            .then(artists => res.send(artists))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los artistas.'))
    },
    getArtistById(req, res) {
        Artist.findAll({
                include: [Game],
                where: { id: req.params.id },
                order: [
                    ['name', 'ASC'],
                    [models.Game, 'name', 'ASC']
                ]
            })
            .then(artists => res.send(artists))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los artistas.'))
    },
    getByTimeMinus(req, res) {
        Game.findAll({
                include: [Type, Mechanic, Author, Artist],
                where: {
                    time: {
                        [Op.lte]: req.params.time
                    }
                },
                order: [
                    ['name', 'ASC'],
                    [models.Type, 'name', 'ASC'],
                    [models.Mechanic, 'name', 'ASC'],
                    [models.Author, 'name', 'ASC'],
                    [models.Artist, 'name', 'ASC']
                ]
            })
            .then(games => res.send(games))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los juegos.'))
    },
    getByTimePlus(req, res) {
        Game.findAll({
                include: [Type, Mechanic, Author, Artist],
                where: {
                    time: {
                        [Op.gte]: req.params.time
                    }
                },
                order: [
                    ['name', 'ASC'],
                    [models.Type, 'name', 'ASC'],
                    [models.Mechanic, 'name', 'ASC'],
                    [models.Author, 'name', 'ASC'],
                    [models.Artist, 'name', 'ASC']
                ]
            })
            .then(games => res.send(games))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los juegos.'))
    },
    getByAge(req, res) {
        Game.findAll({
                include: [Type, Mechanic, Author, Artist],
                where: {
                    age: {
                        [Op.gte]: req.params.age
                    }
                },
                order: [
                    ['name', 'ASC'],
                    [models.Type, 'name', 'ASC'],
                    [models.Mechanic, 'name', 'ASC'],
                    [models.Author, 'name', 'ASC'],
                    [models.Artist, 'name', 'ASC']
                ]
            })
            .then(games => res.send(games))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los juegos.'))
    }
}
module.exports = SearchController;