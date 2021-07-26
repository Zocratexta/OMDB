import "./favorites.css"
import React from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getFavorites, dropFavorites } from "../../store/favorite"


export default function FavoritesContainer() {
    const favorites = useSelector((state) => state.favorites)
    const dispatch = useDispatch()
    const history = useHistory()
    
    React.useEffect(() => {
        dispatch(getFavorites())
            .catch(() => history.push("/login"))
    }, [dispatch, history])
    
    const removeFavorite = (id) => {
        dispatch(dropFavorites(id))
    }

    return (
        <>
        <h1 className="titleFav">My Favorites</h1>
        <div className="favorites">
            {favorites ?
                favorites.map((movie, id)=> {
                    return (
                        <div key={id} className="favoriteItem">
                            <h2>{movie.title}</h2>
                            <img src={movie.poster} alt="movie-poster" />
                            <div>
                            <button
                                className="removeButton"
                                onClick={() => removeFavorite(movie.titleId)}
                                >Remove
                            </button>
                            </div>
                        </div>
                    )
                })
            :
                null
            }
        </div> 
        </>
    )
}
