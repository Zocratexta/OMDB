import "./login.css"
import React from "react"
import axios from "axios"
import { UserContext } from "../../index.js"
import { useHistory } from "react-router-dom"

export default function LoginContainer() {
    const { setUser } = React.useContext(UserContext)
    const [email, setEmail] = React.useState("")
    const [password, setPass] = React.useState("")
    const history = useHistory()
    
    const handlerSubmit = async (e) => {
        e.preventDefault()
        return axios.post("/api/login", { email, password })
            .then(res => setUser(res.data))
            .then(() => history.push("/"))
    }

    return (
            <form className="form" onSubmit={handlerSubmit} >
                    <input
                        className="input"
                        type="text"
                        name="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <button
                        className="submitButton"
                        type="submit"
                        onClick={handlerSubmit}
                        > Login
                    </button>
            </form>
    )
}
