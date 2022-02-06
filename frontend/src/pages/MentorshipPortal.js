/* eslint-disable radix */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import AuthContext from '../context/AuthContext';

const MentorshipPortal = () => {
  const { user, authTokens } = useContext(AuthContext);

  const [mentors, setMentors] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [formDisabled, setFormDisabled] = useState(true);

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

  return (
    <div>
      <Header />

      <h1> --- Mentorship Portal --- </h1>
      <div>
        {mentors.map((mentor) => (
          <div key={mentor.id}>
            <p>Name: {mentor.name}</p>
            <p>Bio: {mentor.bio} </p>
            <p>
              {' '}
              Timings: {mentor.startTime} - {mentor.endTime} {mentor.timeZone}{' '}
            </p>
            <button onClick={() => setFormDisabled(false)}>
              {' '}
              Schedule a meet{' '}
            </button>
            {/* TODO: Clicking on the button, open's the forms of every mentor rather than a single mentor. Fix this. */}
            <form hidden={formDisabled} onSubmit={scheduleMeet}>
              <p> Enter start time for a 1hr meeting </p>
              <input
                type="number"
                name="time"
                min={parseInt(mentor.startTime?.split(':')[0])}
                max={parseInt(mentor.endTime?.split(':')[0]) - 1}
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
          </div>
        ))}
      </div>

      {/*  To show a user's scheduled meetings */}
      <h3> ---- Meetings scheduled by user ---- </h3>
      <div>
        {meetings.length === 0 ? <p> No meetings scheduled </p> : null}

        {meetings.map((meeting) => (
          <div key={meeting.id}>
            {meeting.confirmed === true ? (
              <p> Meeting Confirmed : True</p>
            ) : (
              <p> Meeting Confirmed: False </p>
            )}
            <p> Mentor Name: {meeting.mentor.name} </p>
            <p>
              {' '}
              Requested Time: {meeting.startTime} - {meeting.endTime}{' '}
              {meeting.mentor.timeZone}{' '}
            </p>
            {meeting.accepted === false ? (
              <p> Meeting Link: NA </p>
            ) : (
              <p> Meeting Link: {meeting.meetingLink} </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorshipPortal;
