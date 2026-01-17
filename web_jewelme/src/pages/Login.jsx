import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import { AuthContext } from '../auth/AuthProvider'

export default function Login() {
    const {user} = useContext(AuthContext)
    let navigate = useNavigate()

    const returnToHome = (event) => {
        event.preventDefault()
        navigate("/")
    }

    
    return (
        <div>

            <div>
                <LoginForm/>
            </div>
        </div>

        
    )
}