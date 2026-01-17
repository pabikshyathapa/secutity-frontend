// import React, { useContext } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { AuthContext } from '../auth/AuthProvider'

// export default function Header() {
//   const {user,logout}=useContext(AuthContext)
//   return (
//     <header>
//         <div className='container mx-auto'>
//             <nav className='space-x-4'>
//                 <NavLink to="/">Home</NavLink>
//                 {
//                   !user && (
//                     <>
//                     <NavLink to="/login">Login</NavLink>
//                 <Link to="/register">Register</Link>
//                     </>
//                   )
//                 }
//                 {
//                   user && (
//                     <>
//                     welcome{user.email}
//                     <NavLink onClick={logout}>Logout</NavLink>
//                     </>
//                   )
//                 }
//             </nav>
//         </div>
//     </header>
//   )
// }
