import React from "react"
import axios from "axios"
import "./header.css"

import { useState } from "react"
import { Link, useHistory} from "react-router-dom"
import { UserContext } from "../../index.js"

export default function HeaderContainer() {
    const [ value, setValue ] = useState("")
    const { user, setUser } = React.useContext(UserContext)
    const history = useHistory()
    
    const handlerChange = (e) => {
        setValue(e.target.value)
    }
    
    const handlerLogout = async () => {
        return axios.post("/api/logout")
            .then(() => {
                setUser({})
                history.push("/")
            })
    }
    
    return (
        <div className="header">
            <Link to={"/"} className="section">
                <h1 className="title">OMDB</h1>
            </Link>
            <form >
                <input
                    className="search-input"
                    type="text"
                    name="query"
                    placeholder="search..."
                    onChange={handlerChange}
                />
                <Link to={`/movies/${value}`}>
                    <button
                        className="searchButton"
                        type="submit"
                    >Search
                    </button>
                </Link>
            </form>
            { user.id ? (
                <div>
                    <Link to="/users" className="section">SearchUsers</Link>
                    <Link to="/favorites" className="section">Favorites</Link>
                    <Link to="" className="section" onClick={handlerLogout}>Logout</Link>
                </div>
                ) : (
                <div>
                    <Link to="/login" className="section">SignIn</Link>
                     <Link to="/register" className="section">Register</Link>
                </div>
            ) }
        </div>
    )
}
