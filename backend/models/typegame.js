'use strict';
module.exports = (sequelize, DataTypes) => {
    const TypeGame = sequelize.define('TypeGame', {
        TypeId: DataTypes.INTEGER,
        GameId: DataTypes.INTEGER
    }, {});
    TypeGame.associate = function(models) {
        // associations can be defined here
    };
    return TypeGame;
};