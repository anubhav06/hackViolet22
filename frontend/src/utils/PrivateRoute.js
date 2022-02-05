import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import CompanyAuthContext from '../context/CompanyAuthContext'

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    let {company} = useContext(CompanyAuthContext)

    // If no one is logged in from either the user or the company
    let loggedIn = true;
    if(user === null && company === null){
        loggedIn = false;
    }

    return(
        // If user is not authenticated, redirect to login, else continue with the request
        <Route {...rest}>{!loggedIn ? <Redirect to="/login" /> :   children}</Route>
    )
}

export default PrivateRoute;