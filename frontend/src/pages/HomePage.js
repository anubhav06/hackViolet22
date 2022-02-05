import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import Header from '../components/Header'

const HomePage = () => {
    let [restaurants, setRestaurants] = useState([])
    let {logoutUser} = useContext(AuthContext)


    return (
        <div>
            <Header/>
            
            HOME PAGE
            <br/><br/><br/>
            <p> Mentorship/Video calling - ANUBHAV </p>
            <p> Job Portal - ANUBHAV </p>
            <p> Quora like forum - DHRUV </p>

        </div>
    )
}

export default HomePage
