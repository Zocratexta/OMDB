import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"


import HeaderContainer from "./Header/HeaderContainer"
import MainContainer from "./Main/MainContainer"
import MoviesContainer from "./Movies/MoviesContainer"
import SingleMovieContainer from "./SingleMovie/SingleMovieContainer"
import RegisterContainer from "./Register/RegisterContainer"
import LoginContainer from "./Login/LoginContainer"
import FavoritesContainer from "./Favorites/FavoritesContainer"
import UsersContainer from "./Users/UsersContainer"
import ProfileUserContainer from "./ProfileUser/ProfileUserContainer"

import "./App.css"

import { useContext } from "react"
import { UserContext } from "../index.js"
import axios from "axios"

export default function App() {
    const { setUser } = useContext(UserContext)

    React.useEffect(() => {
        axios.get("/api/me")
            .then(res => res.data)
            .then(user => setUser(user))
            .catch(({ response }) => {
                console.log(response.status, response.statusText)
            })
    }, [setUser])

    return (
        <div className="App">
            <HeaderContainer />
                <Switch>
                    <Route
                        exact path="/movies/:name"
                        render={(props) => <MoviesContainer search={props.match.params.name} />} />
                    <Route
                        path ="/movie/:id"
                        render={(props) => <SingleMovieContainer id={props.match.params.id}/>} />
                    <Route path="/register" component={RegisterContainer} /> 
                    <Route path="/login" component={LoginContainer} /> 
                    <Route path="/users" component={UsersContainer} />
                    <Route
                        path="/user/:id"
                        render={(props) => <ProfileUserContainer user={props.match.params.id} />} />
                    <Route path="/favorites" component={FavoritesContainer} />
                    <Route exact path="/" component={MainContainer} />
                    <Redirect to="/" />
                </Switch>
        </div>
    )
}
