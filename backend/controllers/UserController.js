const { User, Token } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const { jwt_secret } = require('../config/config.json')[env];

const UserController = {
    async register(req, res) {
        try {
            const password = await bcrypt.hash(req.body.password, 9);
            const user = await User.create({
                username: req.body.username,
                password,
                role: 'user'
            });
            res.status(201).send({ user, message: 'User creado con éxito' });
        } catch (error) {
            res.status(500).send({ message: 'Hubo un problema al tratar de crear el usuario' });
        }
    },

    async login(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            })
            if (!user) { return res.status(400).send({ message: 'Usuario o contraseña incorrectas' }) }

            const isMatch = await bcrypt.compare(req.body.password, user.password);

            if (!isMatch) { return res.status(400).send({ message: 'Usuario o contraseña incorrectas' }) }

            const token = jwt.sign({ id: user.id }, jwt_secret);

            Token.create({ token, UserId: user.id });

            res.send({ message: 'Bienvenid@ ' + user.username, user, token })
        } catch (error) {
            res.status(500).send({ message: 'Hubo un problema al tratar de logearnos' });
        }
    },

    async getInfo(req, res) {
        res.send(req.user);
    }
}
module.exports = UserController;