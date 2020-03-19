'use strict';
module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        year: {
            allowNull: false,
            type: DataTypes.STRING
        },
        image: DataTypes.STRING,
        minPlayer: DataTypes.STRING,
        maxPlayer: DataTypes.STRING,
        time: DataTypes.STRING,
        age: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {});
    Game.associate = function(models) {
        Game.belongsToMany(models.Mechanic, {
            through: models.MechanicGame
        });
        Game.belongsToMany(models.Type, {
            through: models.TypeGame
        });
        Game.belongsToMany(models.Author, {
            through: models.AuthorGame
        });
        Game.belongsToMany(models.Artist, {
            through: models.ArtistGame
        });
    };
    return Game;
};