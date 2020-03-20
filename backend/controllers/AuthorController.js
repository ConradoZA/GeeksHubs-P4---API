const express = require('express');
const router = express.Router();
const { Game, Author, sequelize } = require('../models/index.js')

const AuthorController = {
    getAll(req, res) {
        Author.findAll({ include: [Game] })
            .then(authors => res.send(authors))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener los autores.'))
    },
    getOne(req, res) {
        Author.findOne({
                include: [Game],
                where: { id: req.params.id }
            })
            .then(author => res.send(author))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de obtener el autor.'))

    },
    insert(req, res) {
        Author.create({
                name: req.body.name,
                photo: req.body.photo,
                description: req.body.description
            })
            .then(author => res.status(201).send(author))
            .catch(err => {
                console.log(err);
                res.status(500).send('Ha habido problemas al tratar de crear el autor.')
            })
    },
    insertMany(req, res) {
        Author.bulkCreate([...req.body])
            .then(author => res.status(201).send("Hecho!"))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de crear los autores.'))
    },
    put(req, res) {
        Author.update({...req.body }, { where: { id: req.params.id } })
            .then(author => author.findByPk(req.params.id))
            .then(author => {
                res.status(200).send(author)
            })
            .catch(err => res.status(500).send('Ha habido problemas al tratar de actualizar el autor.'))
    },
    delete(req, res) {
        Author.destroy({ where: { id: req.params.id } })
            .then(() => sequelize.query(`DELETE FROM AuthorGames where AuthorId = ${req.params.id}`))
            .then(() => res.status(200).send('Autor eliminado.'))
            .catch(err => res.status(500).send('Ha habido problemas al tratar de eliminar el autor.'))
    }
}
module.exports = AuthorController;