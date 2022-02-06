/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
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
      <Header />

      <h1> --- MENTOR VIEW --- </h1>
      <div>
        {meetings.map((meeting) => (
          <div key={meeting.id}>
            {meeting.accepted ? (
              <p> Accepted: True </p>
            ) : (
              <p> Accepted: False </p>
            )}
            <p>
              {' '}
              Timings: {meeting.startTime} - {meeting.endTime}{' '}
              {meeting.mentor.timeZone}{' '}
            </p>
            <p>
              {' '}
              Meeting link:{' '}
              <a href={meeting.meetingLink}>{meeting.meetingLink}</a>{' '}
            </p>
            {meeting.accepted ? null : (
              <form onSubmit={confirmMeeting}>
                <input type="text" name="id" defaultValue={meeting.id} hidden />
                <input type="submit" value="Confirm Meeting" />
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorViewPortal;
