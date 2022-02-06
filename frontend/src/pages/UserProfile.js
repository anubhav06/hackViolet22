import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import AuthContext from '../context/AuthContext';

const UserProfile = ({ match }) => {
  const { user, authTokens } = useContext(AuthContext);

  let mentor = false;
  if (user.group === 'Mentor') {
    mentor = true;
  }

  const [userInfo, setUserInfo] = useState([]);

  const history = useHistory();

  // Runs the following functions on each load of page
  useEffect(() => {
    // To get the cart items of the logged in user (all the food items added to the user's cart)
    const getUserInfo = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/get-info/`,
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
        setUserInfo(data);
      } else {
        alert('ERROR: While getting user\ns data. ', response);
      }
    };

    // Call these functions on each load of page
    getUserInfo();
  }, []);

  console.log('USER: ', userInfo);

  // Add new job method
  const addInfo = async (e) => {
    e.preventDefault();

    // Reference: https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833
    // eslint-disable-next-line camelcase
    const form_data = new FormData();
    form_data.append('image', e.target.image.files[0]);
    form_data.append('name', e.target.name.value);
    form_data.append('bio', e.target.bio.value);
    form_data.append('startTime', e.target.startTime.value);
    form_data.append('endTime', e.target.endTime.value);
    form_data.append('timeZone', e.target.timeZone.value);

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/add-info/`;
    axios
      .post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
          // Provide the authToken when making API request to backend to access the protected route of that user
          Authorization: `Bearer ${String(authTokens.access)}`,
        },
      })
      .then((response) => {
        history.push('/my-account');
        alert(response.data);
        console.log(response.data);
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <Header />
      <h3> USER'S INFO </h3>
      <div>
        {userInfo.map((info) => (
          <div key={info.id}>
            <p> Name: {info.name} </p>
            <p> Bio: {info.bio} </p>
            <p>
              {' '}
              Image: <img src={info.image} alt="userPhoto" />{' '}
            </p>
            {mentor ? (
              <div>
                <p>
                  {' '}
                  Timings: {info.startTime} - {info.endTime} {info.timeZone}{' '}
                </p>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <h3> FORM TO ADD DATA: </h3>
      <form onSubmit={addInfo}>
        <input
          type="file"
          accept="image/x-png,image/jpeg,image/jpg"
          name="image"
          placeholder="User image"
        />{' '}
        <br />
        <input type="text" name="name" placeholder="name" /> <br />
        <input type="text" name="bio" placeholder="bio" /> <br />
        <input type="time" name="startTime" hidden={!mentor} defaultValue="" />
        <input
          type="time"
          name="endTime"
          hidden={!mentor}
          defaultValue=""
        />{' '}
        <br />
        <input
          type="text"
          name="timeZone"
          hidden={!mentor}
          placeholder="Time Zone (EST/IST)"
          defaultValue=""
        />{' '}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default UserProfile;
