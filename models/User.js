const Sequelize = require('sequelize')
const db = require("../config/db")
const bcrypt = require("bcrypt")

const Favorite = require("./Favorite")

class User extends Sequelize.Model {
    hash(password, salt) {
        return bcrypt.hash(password, salt)
    }
}

User.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    salt: {
        type: Sequelize.STRING,
    }

}, { sequelize: db, modelName: 'user' })


User.beforeCreate((user) => {
    return bcrypt.genSalt(10)
        .then(salt => {
            user.salt = salt
            return user.hash(user.password, salt)
        })
        .then(hash => {
            user.password= hash
        })
})

Favorite.belongsTo(User, { as: "user" })

module.exports = User
