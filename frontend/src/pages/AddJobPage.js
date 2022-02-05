import React, {useState, useEffect, useContext} from 'react'
import CompanyAuthContext from '../context/CompanyAuthContext'
import Header from '../components/Header'

const AddJobPage = () => {

    let [restaurants, setRestaurants] = useState([])
    let {company} = useContext(CompanyAuthContext)

    
    // Login User method
    let addJob = async (e )=> {
        e.preventDefault()
        // Make a post request to the api with the user's credentials.
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/job-portal/add/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            // 'e.target' is the form, '.username' gets the username field and '.password' gets the password field from wherever it is called (LoginPage.js here)
            body:JSON.stringify({'name':e.target.name.value, 'description':e.target.description.value, 'location':e.target.location.value, 'website':e.target.website.value})
        })
        // Get the access and refresh tokens
        let data = await response.json()

        if(response.status === 200){
            alert(data)

        }
        else{
            alert('ERROR: ', data)
        }
    }


    return (
        <div>
            <Header/>
            
            <h1> --- Add a new job --- </h1>
            
            <div>
                <div className='form-header'> Login Form </div>
                <form onSubmit={addJob}>
                    <input type="text" name="name" placeholder="Job Name"/> <br/>
                    <input type="text" name="description" placeholder="Job Description"/> <br/>
                    <input type="text" name="location" placeholder='Job Location'/> <br/>
                    <input type="text" name="website" placeholder='Apply link' /> <br/>
                    <input type="submit"/>
                </form>
            </div>

        </div>
    )
}

export default AddJobPage
