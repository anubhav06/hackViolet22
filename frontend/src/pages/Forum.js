/* eslint-disable no-alert */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
import AuthContext from '../context/AuthContext';
import MenuCard from '../components/Cards/menuCard';
import CardContainer from '../components/Cards/forumCard';
// import forumData from '../data/forumData';
import AskQuestion from '../components/Cards/submitTextfield';
import '../css/Forum.css';

const Forum = () => {
  const { authTokens } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const [displayForm, setDisplayForm] = useState(true);

  const history = useHistory();

  useEffect(() => {
    // To fetch all the jobs listed by all the companies
    const getPosts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/forum/get-posts/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        setPosts(data);
      } else {
        alert('ERROR: ', data);
      }
    };

    getPosts();
  }, []);

  const forumCards = posts.map((post) => (
    <CardContainer
      key={post.id}
      /* sx={{ m: 2 }} */
      forumTitle={post.poster.name}
      datePosted={new Date(post.timestamp).toDateString()}
      content={post.content}
      likes={post.likes}
      numComments={post.reply.length}
      id={post.id}
    />
  ));

  // To add a new post

  // To add a new comment
  const addComment = async (e) => {
    e.preventDefault();
    // Make a post request to the api with the user's credentials.
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/forum/add-comment/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Provide the authToken when making API request to backend to access the protected route of that user
          Authorization: `Bearer ${String(authTokens.access)}`,
        },
        // 'e.target' is the form, '.username' gets the username field and '.password' gets the password field from wherever it is called (LoginPage.js here)
        body: JSON.stringify({
          content: e.target.content.value,
          postID: e.target.postID.value,
        }),
      }
    );
    // Get the access and refresh tokens
    const data = await response.json();

    if (response.status === 200) {
      alert(data);
      history.push('/forum');
    } else {
      alert('ERROR: ', data);
    }
  };

  // To add a new like
  const like = async (e) => {
    e.preventDefault();
    // Make a post request to the api with the user's credentials.
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/forum/like/${e.target.postID.value}`,
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
      history.push('/forum');
    } else {
      alert('ERROR: ', data);
    }
  };

  console.log('POSTS: ', posts);

  return (
    <div>
      {/* <Header /> */}

      <div className="forumPage">
        <div className="forumCol1">
          <div className="postForum">
            <h1 className="ask">Ask a Question</h1>
            <AskQuestion />
          </div>
          <div className="forumCards">{forumCards}</div>
        </div>
        <div className="forumCol2">
          {/*   <br /><br /><br /><br /> */}
          <MenuCard />
        </div>
      </div>
    </div>
  );
};

export default Forum;
