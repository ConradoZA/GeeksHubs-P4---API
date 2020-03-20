const express = require('express');
const router = express.Router();
const { Game, Artist, sequelize } = require('../models/index.js')

const ArtistController = {
    getAll(req, res) {
        Artist.findAll({ include: [Game] })
            .then(artists => res.send(artists))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los artistas.'))
    },
    getOne(req, res) {
        Artist.findOne({
                include: [Game],
                where: { id: req.params.id }
            })
            .then(artist => res.send(artist))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener el artista.'))

    },
    insert(req, res) {
        Artist.create({
                name: req.body.name,
                photo: req.body.photo,
                description: req.body.description
            })
            .then(artist => res.status(201).send(artist))
            .catch(err => {
                console.log(err);
                res.status(500).send('Ha habido problemas al tratar de crear el artista.')
            })
    },
    insertMany(req, res) {
        Artist.bulkCreate([...req.body])
            .then(artist => res.status(201).send("Hecho!"))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de crear los artistas.'))
    },
    put(req, res) {
        Artist.update({...req.body }, { where: { id: req.params.id } })
            .then(artist => artist.findByPk(req.params.id))
            .then(artist => {
                res.status(200).send(artist)
            })
            .catch(err => res.status(500).send('Ha habido problemas al tratar de actualizar el artista.'))
    },
    delete(req, res) {
        Artist.destroy({ where: { id: req.params.id } })
            .then(() => sequelize.query(`DELETE FROM ArtistGames where ArtistId = ${req.params.id}`))
            .then(() => res.status(200).send('Artista eliminado.'))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de eliminar el artista.'))
    }
}
module.exports = ArtistController;