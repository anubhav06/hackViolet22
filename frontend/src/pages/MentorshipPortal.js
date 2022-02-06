/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
import AuthContext from '../context/AuthContext';
import Header from '../components/Header';

const MentorshipPortal = () => {
  const { user, authTokens } = useContext(AuthContext);

  const [mentors, setMentors] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [formDisabled, setFormDisabled] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const history = useHistory();

  useEffect(() => {
    // To fetch all the mentors
    const getMentors = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/mentorship/get-mentors/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        setMentors(data);
      } else {
        alert('ERROR: ', data);
      }
    };

    // To fetch all the mentors
    const getMeetings = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/mentorship/user/get-meetings/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Provide the authToken when making API request to backend to access the protected route of that user
            Authorization: `Bearer ${String(authTokens.access)}`,
          },
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        setMeetings(data);
      } else {
        alert('ERROR: ', data);
      }
    };

    getMentors();
    getMeetings();
  }, []);

  // To schedule a meet with a mentor
  const scheduleMeet = async (e) => {
    e.preventDefault();
    // Make a post request to the api with the user's credentials.
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/mentorship/user/schedule-meet/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Provide the authToken when making API request to backend to access the protected route of that user
          Authorization: `Bearer ${String(authTokens.access)}`,
        },
        // 'e.target' is the form, '.username' gets the username field and '.password' gets the password field from wherever it is called (LoginPage.js here)
        body: JSON.stringify({
          time: e.target.time.value,
          mentor: e.target.mentor.value,
        }),
      }
    );
    // Get the access and refresh tokens
    const data = await response.json();

    if (response.status === 200) {
      alert(data);
      history.push('/mentorship');
    } else {
      alert('ERROR: ', data);
    }
  };
  console.log('MEETINGS: ', meetings);
  console.log('MENTOR: ', mentors);

  return (
    <div>
      <Header />
      <Container>
        <Grid container>
          <Grid item xs={5}>
            <Paper>
              <Typography gutterBottom variant="h3" color="textSecondary">
                {' '}
                Mentorship Portal{' '}
              </Typography>
              <div>
                {mentors.map((mentor) => (
                  <div key={mentor.id}>
                    <Card sx={{ maxWidth: 'auto' }}>
                      <CardHeader
                        avatar={
                          <Avatar
                            src={mentor.image}
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                          >
                            {/* {mentor.name[0]} */}
                          </Avatar>
                        }
                        // action={
                        // <IconButton aria-label="settings">
                        //     <MoreVertIcon />
                        // </IconButton>
                        // }
                        title={mentor.name}
                        subheader={`${mentor.startTime} - ${mentor.endTime} ${mentor.timeZone}`}
                      />

                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Bio: {mentor.bio}
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
                        <Button
                          variant="contained"
                          endIcon={<AlarmIcon />}
                          onClick={() => setShowForm(true)}
                        >
                          Schedule a meet
                        </Button>

                        <Collapse in={showForm} timeout="auto" unmountOnExit>
                          <CardContent>
                            <form onSubmit={scheduleMeet}>
                              <Typography paragraph>
                                Enter start time for a 1hr meeting
                              </Typography>
                              <input
                                type="number"
                                name="time"
                                min={parseInt(mentor.startTime?.split(':')[0])}
                                max={
                                  parseInt(mentor.endTime?.split(':')[0]) - 1
                                }
                              />{' '}
                              : 00: 00 <br />
                              <input
                                type="text"
                                name="mentor"
                                defaultValue={mentor.id}
                                hidden
                              />
                              <input type="submit" value="Schedule" />
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
          <Grid item xs={1} />
          <Grid item xs={6}>
            <Paper>
              <Typography gutterBottom variant="h5" color="textSecondary">
                Meetings scheduled by user
              </Typography>
              <div>
                {meetings.length === 0 ? (
                  <Typography variant="h5" component="div" alignCenter>
                    No meetings scheduled{' '}
                  </Typography>
                ) : null}

                {meetings.map((meeting) => (
                  <div key={meeting.id}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardContent>
                        {meeting.accepted === true ? (
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            alignCenter
                          >
                            Meeting Confirmed!
                          </Typography>
                        ) : (
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            alignCenter
                          >
                            Meeting not Confirmed by mentor
                          </Typography>
                        )}

                        <Typography variant="body2" color="text.secondary">
                          Mentor Name: {meeting.mentor.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Requested Time: {meeting.startTime} -{' '}
                          {meeting.endTime} {meeting.mentor.timeZone}
                        </Typography>
                        {meeting.accepted === false ? (
                          <Typography variant="body2" color="text.secondary">
                            Meeting Link: NA{' '}
                          </Typography>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            {' '}
                            Meeting Link: {meeting.meetingLink}{' '}
                          </Typography>
                        )}
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
    </div>
  );
};

export default MentorshipPortal;
