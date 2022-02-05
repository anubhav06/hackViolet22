import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import Header from '../components/Header'
import CompanyAuthContext from '../context/CompanyAuthContext'

const HomePage = () => {
    let [restaurants, setRestaurants] = useState([])
    let {user} = useContext(AuthContext)
    let {company} = useContext(CompanyAuthContext)

    let mentor = false;
    if(user && user['group'] === "Mentor"){
        mentor=true;
    }

    return (
        <div>
            <Header/>
            
            HOME PAGE
            <br/><br/><br/>

            {company ?
            <div>
                <a href="/job-portal/company" > Job Portal - Company's View </a>
            </div>
            : 
            <div>    
                {mentor ?
                    <div> 
                        <a href="/mentorship/mentor-view" > Mentorship Page - Mentor's View </a><br/>
                    </div>
                :   <div>
                        <a href="/mentorship"> Mentorship/Video calling - ANUBHAV </a> <br/> 
                    </div>
                }
                <a href="/job-portal"> Job Portal - ANUBHAV </a> <br/>
                <a href="/forum"> Quora like forum - DHRUV </a> <br/>
            </div>}



        </div>
    )
}

export default HomePage
