import React, {useState, useEffect, useContext} from 'react'
import CompanyAuthContext from '../context/CompanyAuthContext'
import Header from '../components/Header'

const JobPortal = () => {

    let [restaurants, setRestaurants] = useState([])
    let {company} = useContext(CompanyAuthContext)


    return (
        <div>
            <Header/>
            
            <h1> --- Job Portal --- </h1>
            {company
            ?  <div>
                    <a href="job-portal/add"> Add a new job </a>
                    <div>
                        All your active jobs will show here
                    </div>
                </div>
            : (null)}


        </div>
    )
}

export default JobPortal
