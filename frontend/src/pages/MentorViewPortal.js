import React, {useState, useEffect, useContext} from 'react'
import Header from '../components/Header'
import { useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const MentorViewPortal = () => {

    let {user, authTokens} = useContext(AuthContext)

    let [mentors, setMentors] = useState([])
    let [meetings, setMeetings] = useState([])
    let [formDisabled, setFormDisabled] = useState(true)

    const history = useHistory()
    

    useEffect(()=> {
        
        
        // To fetch all the mentors
        let getMeetings = async() =>{
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/mentorship/mentor/get-meetings/`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    // Provide the authToken when making API request to backend to access the protected route of that user
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            let data = await response.json()

            if(response.status === 200){
                setMeetings(data)
            }else{
                alert('ERROR: ', data)
            }
            
        }
        
        getMeetings()

    }, [])

    console.log('MEETINGS: ', meetings)

    // To confirm a meeting
    let confirmMeeting = async (e )=> {
        e.preventDefault()
        // Make a post request to the api with the user's credentials.
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/mentorship/mentor/confirm-meeting/${e.target.id.value}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                // Provide the authToken when making API request to backend to access the protected route of that user
                'Authorization':'Bearer ' + String(authTokens.access)
            },
        })
        // Get the access and refresh tokens
        let data = await response.json()

        if(response.status === 200){
            alert(data)
            history.push('/mentorship/mentor-view')
        }
        else{
            alert('ERROR: ', data)
        }
    }



    return (
        <div>
            <Header/>
            
            <h1> --- MENTOR VIEW --- </h1>
            <div>
                {meetings.map(meeting => (
                    <div key={meeting.id}>
                        {meeting.accepted ?
                        <p> Accepted: True </p>
                        : <p> Accepted: False </p>}
                        <p> Timings: {meeting.startTime} - {meeting.endTime} {meeting.mentor.timeZone}  </p>
                        <p> Meeting link: <a href={meeting.meetingLink}>{meeting.meetingLink}</a> </p>
                        {meeting.accepted ? (null)
                        :
                        <form onSubmit={confirmMeeting}>
                            <input type='text' name='id' defaultValue={meeting.id} hidden={true} />
                            <input type='submit' value='Confirm Meeting' />
                        </form>
                        }
                    </div>
                ))}
            </div>


        </div>
    )
}

export default MentorViewPortal
