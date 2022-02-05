import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import CompanyAuthContext from '../context/CompanyAuthContext'



const Header = () => {

    let {user, logoutUser} = useContext(AuthContext)
    let {company, logoutCompany} = useContext(CompanyAuthContext)

    let loggedIn = true;

    if(user == null && company == null){
        loggedIn=false;
    }

    return (
        <header className='Header'>

        {user
        ?   <div>
                <a href="/restaurants" className='link'>Home</a>
                <a href='/my-account' className='link'> {user.username} </a>
                <a href="" className='link' onClick={logoutUser}> Logout </a>
            </div>
        : (null)}

        {company
        ?   <div>
                <a href="/restaurants" className='link'>Home</a>
                <a href='/my-account' className='link'> {company.username} </a>
                <a href="" className='link' onClick={logoutCompany}> Logout </a>
            </div>
        : (null)}

        {loggedIn ? (null)
        :   <div>
                <a href ="/login"> Login </a>
                <a href="/login-company"> Login as a company </a>
                <a href="/register"> Register </a>
                <a href="/register-company"> Register as a company </a>
            </div>
        }
           
        </header>
    )
}

export default Header
