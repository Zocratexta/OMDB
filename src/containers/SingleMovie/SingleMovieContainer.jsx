import './singleMovie.css'
import React from "react";
import axios from "axios"

import { useSelector, useDispatch } from "react-redux"
import { getSingleMovie } from "../../store/singleMovie"
import { UserContext } from "../../index.js"

export default function SingleMovieContainer({ id }) {
    const movie = useSelector((state) => state.singleMovie)
    const dispatch = useDispatch()
    const {user} = React.useContext(UserContext)

    React.useEffect(() => {
        dispatch(getSingleMovie(id))
    }, [dispatch, id])
    
    const addFavorites = () => {
        return axios.post(`/api/favorites/${user.id}`, ({
            title: movie.Title,
            poster: movie.Poster,
            titleId: movie.imdbID
        }))
            .then((res) => {
                if (typeof res.data === "string") return alert(res.data)
                alert(`added movie ${res.data.title}`)
            })
    }
    
    return (
        <>
        <h1 className="titleMovie">{movie.Title}</h1>
        <div className="SingleMovie">
            <div className="movie">
                <img src={movie.Poster} alt="movie-poster" width="350" height="500"/>
            {user.id ?
                <div>
                    <button className="favoriteButton" 
                    onClick={addFavorites}
                    > Add Favorite
                    </button> 

                    </div>

                    : null
            }
            </div>
            <div className="info">
                <p>Actors: {movie.Actors}</p>
                <p>Ploot: {movie.Plot}</p>
                <h4>Genre: {movie.Genre}</h4>
                <h4>Year: {movie.Year}</h4>
                <h4>Awards: {movie.Awards}</h4>
            </div>
        </div>
        </>
    )
}
