const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Favorite = require("../models/Favorite")
const passport = require("passport")

const { Op } = require("sequelize")

router.post("/register", (req, res, next) => {
    User.create(req.body)
        .then(user => res.status(201).send(user))
})

router.post("/login", passport.authenticate("local"), (req, res, next) => {
    res.send(req.user)
})

router.post("/logout", (req, res, next) => {
    req.logOut()
    res.sendStatus(200)
})

router.get("/me", (req, res, next) => {
    if (!req.user) return res.sendStatus(401)
    res.send(req.user)
})

router.post("/favorites/:id", (req, res, next) => {
    Favorite.findOne({
        where: {
            titleId: req.body.titleId,
            userId: req.params.id 
        }
    })
        .then(data => {
            if (data) return res.send("ya se encuentra agregado en tu lista")
            Favorite.create(req.body)
                .then(favorite => {
                    User.findByPk(req.user.id)
                        .then((user) => favorite.setUser(user))
                        .then(favorite => res.send(favorite))
                })
        })
})

router.get("/favorites", (req, res, next) => {
    Favorite.findAll({ where: { userId: req.user.id } })
        .then(favs => res.send(favs))
})

router.get("/favorites/:id", (req, res, next) => {
    Favorite.findOne({ where: { titleId: req.params.id } })
        .then(movie => res.send(movie))
})


router.delete("/favorites/:id", (req, res, next) => {
    Favorite.destroy({ where: { titleId: req.params.id } })
        .then(() => res.sendStatus(200))
})

router.get("/users", (req, res, next) => {
    User.findAll({
        where: {
            id: {
                [Op.ne] : req.user.id
            } 
        }
    })
        .then(users => res.send(users))
})

router.get("/user/:id", (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(user => res.send(user))
})

router.get("/favorite/:user", (req, res, next) => {
    Favorite.findAll({
        where: {
            userId: req.params.user
        }
    })
        .then(data => res.send(data))
})

router.use("/", function (req, res) {
  res.sendStatus(404);
});

module.exports = router;
