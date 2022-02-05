import React, {useContext, useState} from 'react'
import { Redirect } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Header from '../components/Header'


const LoginPage = () => {

    // Get the login user function from AuthContext 
    let {user, loginUser} = useContext(AuthContext)

    

    if(localStorage.getItem('authTokens') !== null){
        return(  
            <p> You need to logout from your USER ACCOUNT to login with the COMPANY ACCOUNT ! </p>
        )
    }

    if(localStorage.getItem('companyAuthTokens') !== null){
        return(  
            <p> You need to logout from your COMAPNY ACCOUNT to login with the USER ACCOUNT ! </p>
        )
    }

    // To not allow login route to a user who is logged in. Redirect to '/'
    if(user){
        return( <Redirect to="/" /> )
    }



    return (
        <div>
            <Header/>
            <div>   
                <div className='form-header'> Login Form </div>
                <form onSubmit={loginUser}>
                    <input type="text" name="email" placeholder="Enter Email" className='form-input'/>
                    <input type="password" name="password" placeholder="Enter Password" className='form-input' /> <br/>
                    <input type="submit" className='form-submit-btn'/>
                </form>
            </div>        
        </div>
    )
}

export default LoginPage
