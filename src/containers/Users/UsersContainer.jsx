import "./users.css"
import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function UsersContainer() {
    const [users, setUsers] = React.useState()
    React.useEffect(() => {
        return axios.get("/api/users")
            .then(users => setUsers(users.data))
    }, [])

    return (
        <>
            <h1 className="titleFav">Other Users</h1>
            <div className="searchUsers">
                {users ? users.map((user, id)=> {
                    return (
                        <div className="userProfile" key={id}>
                            <h2>{user.name}</h2>
                            <h4>{user.email}</h4>
                            <Link to={`/user/${user.id}`}>
                                <button className="userButton">View Profile</button>
                            </Link>
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
