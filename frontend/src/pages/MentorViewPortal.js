/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import AuthContext from '../context/AuthContext';

const MentorViewPortal = () => {
  const { user, authTokens } = useContext(AuthContext);

  const [mentors, setMentors] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [formDisabled, setFormDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    // To fetch all the mentors
    const getMeetings = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/mentorship/mentor/get-meetings/`,
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

    getMeetings();
  }, []);

  console.log('MEETINGS: ', meetings);

  // To confirm a meeting
  const confirmMeeting = async (e) => {
    e.preventDefault();
    // Make a post request to the api with the user's credentials.
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/mentorship/mentor/confirm-meeting/${e.target.id.value}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Provide the authToken when making API request to backend to access the protected route of that user
          Authorization: `Bearer ${String(authTokens.access)}`,
        },
      }
    );
    // Get the access and refresh tokens
    const data = await response.json();

    if (response.status === 200) {
      alert(data);
      history.push('/mentorship/mentor-view');
    } else {
      alert('ERROR: ', data);
    }
  };

  return (
    <div>
      {/* <Paper> */}
      <Typography gutterBottom variant="h2" color="textSecondary">
        {' '}
        Meetings Scheduled for You!
      </Typography>
      <div>
        {meetings.map((meeting) => (
          <div key={meeting.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                {meeting.accepted ? (
                  <Typography
                    gutterBottom
                    variant="h6"
                    color="secondary"
                    alignCenter
                  >
                    {' '}
                    Accepted: True{' '}
                  </Typography>
                ) : (
                  <Typography gutterBottom variant="h6" color="secondary">
                    {' '}
                    Accepted: False{' '}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {' '}
                  Timings: {meeting.startTime} - {meeting.endTime}{' '}
                  {meeting.mentor.timeZone}{' '}
                </Typography>
                <p>
                  {' '}
                  Meeting link:{' '}
                  <a href={meeting.meetingLink}>{meeting.meetingLink}</a>{' '}
                </p>
                {meeting.accepted ? null : (
                  <form onSubmit={confirmMeeting}>
                    <input
                      type="text"
                      name="id"
                      defaultValue={meeting.id}
                      hidden
                    />
                    <input type="submit" value="Confirm Meeting" />
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {/* </Paper> */}
    </div>
  );
};

export default MentorViewPortal;
