'use strict';
module.exports = (sequelize, DataTypes) => {
    const Type = sequelize.define('Type', {
        name: DataTypes.STRING
    }, {});
    Type.associate = function(models) {
        Type.belongsToMany(models.Game, {
            through: models.TypeGame
        })
    };
    return Type;
};