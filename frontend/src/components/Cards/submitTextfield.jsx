import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import * as React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export default function AskQuestion() {
  const { authTokens } = useContext(AuthContext);
  const history = useHistory();
  // To add a new post
  const addPost = async (e) => {
    e.preventDefault();
    // Make a post request to the api with the user's credentials.
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/forum/add-post/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Provide the authToken when making API request to backend to access the protected route of that user
          Authorization: `Bearer ${String(authTokens.access)}`,
        },
        // 'e.target' is the form, '.username' gets the username field and '.password' gets the password field from wherever it is called (LoginPage.js here)
        body: JSON.stringify({ content: e.target.content.value }),
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

  return (
    <>
      <form onSubmit={addPost} className="askQuestionForm">
        <TextField
          id="filled-multiline-static"
          label="Ask a Question"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
          fullWidth
          sx={{ maxWidth: 740, mx: 4 }}
          name="content"
        />
        {/*  <input type="submit" /> */}
        <div>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            type="submit"
            sx={{ mx: 4, my: 2 }}
          >
            Post
          </Button>
        </div>
      </form>
    </>
  );
}
