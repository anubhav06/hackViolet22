import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const UserRoute = ({children, ...rest}) => {

    let {user} = useContext(AuthContext)

    if(user && user['group'] === 'Mentor'){
        user = false
    }

    return(
        // If user is not authenticated, redirect to login, else continue with the request
        <Route {...rest}>{!user ? <Redirect to="/login" /> :   children}</Route>
    )
}

export default UserRoute;