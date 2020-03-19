'use strict';
module.exports = (sequelize, DataTypes) => {
  const AuthorGame = sequelize.define('AuthorGame', {
    AuthorId: DataTypes.STRING,
    GameId: DataTypes.STRING
  }, {});
  AuthorGame.associate = function(models) {
    // associations can be defined here
  };
  return AuthorGame;
};