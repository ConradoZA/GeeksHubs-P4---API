'use strict';
module.exports = (sequelize, DataTypes) => {
    const Mechanic = sequelize.define('Mechanic', {
        name: DataTypes.STRING
    }, {});
    Mechanic.associate = function(models) {
        Mechanic.belongsToMany(models.Game, {
            through: models.MechanicGame
        })
    };
    return Mechanic;
};