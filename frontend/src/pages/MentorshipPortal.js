import React, {useState, useEffect, useContext} from 'react'
import Header from '../components/Header'
import { useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Container } from '@material-ui/core';
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import AlarmIcon from '@mui/icons-material/Alarm';
import Collapse from '@mui/material/Collapse';
import { typography } from '@mui/system';




const MentorshipPortal = () => {

    let {user, authTokens} = useContext(AuthContext)

    let [mentors, setMentors] = useState([])
    let [meetings, setMeetings] = useState([])
    let [formDisabled, setFormDisabled] = useState(true)

    const history = useHistory()
    

    useEffect(()=> {
        
        
        // To fetch all the mentors
        let getMentors = async() =>{
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/mentorship/get-mentors/`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            let data = await response.json()

            if(response.status === 200){
                setMentors(data)
            }else{
                alert('ERROR: ', data)
            }
            
        }


        // To fetch all the mentors
        let getMeetings = async() =>{
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/mentorship/user/get-meetings/`, {
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
        
        getMentors()
        getMeetings()

    }, [])


    // To schedule a meet with a mentor
    let scheduleMeet = async (e )=> {
        e.preventDefault()
        // Make a post request to the api with the user's credentials.
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/mentorship/user/schedule-meet/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                // Provide the authToken when making API request to backend to access the protected route of that user
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            // 'e.target' is the form, '.username' gets the username field and '.password' gets the password field from wherever it is called (LoginPage.js here)
            body:JSON.stringify({'time':e.target.time.value, 'mentor':e.target.mentor.value})
        })
        // Get the access and refresh tokens
        let data = await response.json()

        if(response.status === 200){
            alert(data)
            history.push('/mentorship')
        }
        else{
            alert('ERROR: ', data)
        }
    }


    console.log('MEETINGS: ', meetings)

    return (
        <div>
            <Header/>
            <Container>
                <Grid container>
                    <Grid item xs={5}>
                        <Paper>
                        <Typography gutterBottom variant="h3"> Mentorship Portal </Typography>
                        <div>
                    {mentors.map(mentor => (
                    <div key={mentor.id}>

                        <Card sx={{ maxWidth: "auto" }}>
                            <CardHeader
                                avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {mentor.name[0]}
                                </Avatar>
                                }
                                // action={
                                // <IconButton aria-label="settings">
                                //     <MoreVertIcon />
                                // </IconButton>
                                // }
                                title= {mentor.name}
                                subheader= "TimeZone: ${mentor.timeZone}"
                            />
                            
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                Bio:  {mentor.bio}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                {/* <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                <ShareIcon />
                                </IconButton>
                                */}
                                <Button variant="contained" endIcon={<AlarmIcon />} onClick={() => formDisabled === true ? setFormDisabled(false):setFormDisabled(true)}>
                                    Schedule a meet
                                </Button>
                                
                                <Collapse in={~formDisabled} timeout="auto" unmountOnExit>
                                    <CardContent>
                                    
                                    <form hidden={formDisabled}onSubmit={scheduleMeet}>
                                    <Typography paragraph>
                                    Enter start time for a 1hr meeting
                                    </Typography>
                                        <input type='number' name='time' min={parseInt(mentor.startTime?.split(':')[0])} max={parseInt(mentor.endTime?.split(':')[0])-1}/> : 00: 00 <br/>
                                        <input type='text' name='mentor' defaultValue={mentor.id} hidden={true} />
                                        <input type='submit' value='Schedule' />
                                    </form>
                                    </CardContent>
                                </Collapse>
                            </CardActions>
                            </Card>
                        {/* <p>Name: {mentor.name}</p>
                        <p>Bio: {mentor.bio} </p>
                        <p> Timings: {mentor.startTime} - {mentor.endTime} {mentor.timeZone} </p>
                        <button onClick={() => setFormDisabled(false)}> Schedule a meet </button> */}
                        {/* TODO: Clicking on the button, open's the forms of every mentor rather than a single mentor. Fix this. */}
                        {/* <form hidden={formDisabled} onSubmit={scheduleMeet}>
                            <p> Enter start time for a 1hr meeting </p>
                            <input type='number' name='time' min={parseInt(mentor.startTime?.split(':')[0])} max={parseInt(mentor.endTime?.split(':')[0])-1}/> : 00: 00 <br/>
                            <input type='text' name='mentor' defaultValue={mentor.id} hidden={true} />
                            <input type='submit' value='Schedule' />
                        </form> */}
                    </div>
                ))}
            </div>

                    </Paper>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6}>
                        <Paper>
                        <Typography gutterBottom variant="h5">Meetings scheduled by user</Typography> 
            <div>
                {meetings.length === 0 ? 
                <Typography variant="h5" component="div" alignCenter>No meetings scheduled </Typography>
                : (null)}

                {meetings.map(meeting => (
                    <div key={meeting.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                    {meeting.confirmed === true ?
                                    <Typography gutterBottom variant="h5" component="div" alignCenter>
                                    Meeting Confirmed: True
                                    </Typography>
                                    : <Typography gutterBottom variant="h5" component="div" alignCenter>
                                    Meeting Confirmed: False
                                    </Typography>
                                    }
                                
                                <Typography variant="body2" color="text.secondary">
                                    Mentor Name: {meeting.mentor.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Requested Time: {meeting.startTime} - {meeting.endTime} {meeting.mentor.timeZone}
                                </Typography>
                                {meeting.accepted === false ? 
                                <Typography variant="body2" color="text.secondary">
                                Requested Time: {meeting.startTime} - {meeting.endTime} {meeting.mentor.timeZone}
                                 Meeting Link: NA </Typography>
                                : <Typography variant="body2" color="text.secondary" > Meeting Link: {meeting.meetingLink} </Typography>}
        
                            </CardContent>
                            </Card>
                        
                        {/* <p> Mentor Name: {meeting.mentor.name} </p>
                        <p> Requested Time: {meeting.startTime} - {meeting.endTime} {meeting.mentor.timeZone} </p>
                        {meeting.accepted === false ? 
                        <p> Meeting Link: NA </p>
                        : <p> Meeting Link: {meeting.meetingLink} </p>} */}
                    </div>
                ))}
            </div>

                        </Paper>
                    </Grid>

                </Grid>
            </Container>
            

            


            {/*  To show a user's scheduled meetings */}
            

        </div>
    )
}

export default MentorshipPortal
