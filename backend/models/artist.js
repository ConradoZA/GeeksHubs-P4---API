'use strict';
module.exports = (sequelize, DataTypes) => {
    const Artist = sequelize.define('Artist', {
        name: DataTypes.STRING,
        photo: DataTypes.STRING,
        description: DataTypes.STRING
    }, {});
    Artist.associate = function(models) {
        Artist.belongsToMany(models.Game, {
            through: models.ArtistGame
        });
    };
    return Artist;
};