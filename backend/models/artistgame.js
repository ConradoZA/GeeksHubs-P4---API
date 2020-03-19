'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArtistGame = sequelize.define('ArtistGame', {
    ArtistId: DataTypes.STRING,
    GameId: DataTypes.STRING
  }, {});
  ArtistGame.associate = function(models) {
    // associations can be defined here
  };
  return ArtistGame;
};