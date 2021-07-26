import "./profileUser.css"
import React from "react"
import axios from "axios"

export default function ProfileUserContainer({ user }) {
    const [profile, setProfile] = React.useState()
    const [favs, setFavs] = React.useState([])

    React.useEffect(() => {
        async function fetchData() {
            const prof = await axios.get(`/api/user/${user}`)
            const favorites = await axios.get(`/api/favorite/${prof.data.id}`)
            setProfile(prof.data)
            setFavs(favorites.data)
            console.log(favorites.data)
        }
        fetchData()
    }, [user])

    return (
        <>
            {profile ? (<h1 className="user">{profile.name}</h1>) : null}
            <div className="profile">
                <h2 className="titleUser">Favorites</h2>
            {favs.length > 0 ? favs.map((movie, id)=> {
                return (
                    <div className="userItem" key={id}>
                        <h4>{movie.title}</h4>
                        <img alt="movie poster" src={movie.poster} />
                    </div>
                )
            })
            :
                <h4>No favorites added</h4> 
            }
        </div>
            </>
    )
}
