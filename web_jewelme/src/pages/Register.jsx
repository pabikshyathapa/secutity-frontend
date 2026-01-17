import React, { useContext } from 'react'
import RegisterForm from "../components/auth/RegisterForm"
import {AuthContext} from '../auth/AuthProvider'

export default function Register() {
  const {user}=useContext(AuthContext)
  if(user){
    return(
      <div>you are registered.</div>
    )
  }
  return (
    <div>
      <RegisterForm/>
    </div>
  )
}
