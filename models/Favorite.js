const Sequelize = require("sequelize");
const db = require("../config/db")

class Favorite extends Sequelize.Model {}
Favorite.init({
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    poster: {
        type: Sequelize.STRING
    },

    titleId: {
        type: Sequelize.STRING
    }

}, {sequelize: db, modelName: 'favorite' })


module.exports = Favorite
