const express = require("express")
const cookieParser = require("cookie-parser")
const sessions = require("express-session")
const passport = require("passport")
const localStrategy = require("passport-local")
const http = require("http")
const path = require("path")
const app = express()

const User = require("../models/User")
const db = require("../config/db")
const authApi = require("../routes/")

app.use(express.static(path.resolve(__dirname, "../public")))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(sessions({
    secret: 'omdb',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new localStrategy(
        {
        usernameField: "email",
        passwordField: "password"
        },
        function (email, password, done) {
            User.findOne({where: { email }})    
                .then(user => {
                    if (!user) {
                        return done(null, false)
                    }
                    user.hash(password, user.salt).then(hash => {
                        if (hash !== user.password) {
                            return done(null, false)
                        }
                        
                        return done(null, user)
                    })
                })
                .catch(done)
        }
    )
)

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findByPk(id)
        .then(user => {
            done(null, user)
        })
        .catch(done)
})

app.use("/api", authApi)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"))
})

db.sync({ force: false })
    .then(() => {
        app.listen(3001, () => {
            console.log(`Server listening at port 3001`)
        })
    })
