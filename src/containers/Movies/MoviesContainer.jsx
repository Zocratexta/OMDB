import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { getMovies } from "../../store/movies"
import { Link } from "react-router-dom"
import "./movies.css"

export default function MoviesContainer({ search }) {
    const movies = useSelector((state) => state.movies)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getMovies(search))
    }, [dispatch, search])
    
    return (
        <div id="movieSearch">
            <h2 className="titleSearch">Titles</h2>
        <div className="movies-list">
                {movies.map((movie, id)=> {
                    return (
                        <div className="movies" key={id}>
                            <Link to={`/movie/${movie.imdbID}`} className="movieTitle">
                                <img src={movie.Poster} alt="movie poster" width="300" height="445"/>
                                <h4 className="movieTitle">{movie.Title}</h4>
                            </Link>
                        </div>
                    )
                })}
        </div>
        </div>
    )
}
