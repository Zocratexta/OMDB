import React from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"

export default function RegisterContainer() {
    const history = useHistory()
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPass] = React.useState("")

    const handlerSubmit = async (e) => {
        e.preventDefault()
        return axios.post('/api/register', { name, email, password })
            .then(() => history.push("/login"))
    }

    return (
            <form className="form" onSubmit={handlerSubmit}>
                    <input
                        className="input"
                        type="text"
                        placeholder="name" 
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="input"
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="email"
                        required 
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="password"
                        required
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <button
                        className="submitButton"
                        type="submit"
                        onClick={handlerSubmit}
                        > Sign Up
                    </button>
            </form>
    )
}
