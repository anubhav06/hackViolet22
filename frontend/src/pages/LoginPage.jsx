import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const { user, loginUser } = useContext(AuthContext);

  if (localStorage.getItem('authTokens') !== null) {
    return (
      <p>
        {' '}
        You need to logout from your USER ACCOUNT to login with the COMPANY
        ACCOUNT !{' '}
      </p>
    );
  }

  if (localStorage.getItem('companyAuthTokens') !== null) {
    return (
      <p>
        {' '}
        You need to logout from your COMAPNY ACCOUNT to login with the USER
        ACCOUNT !{' '}
      </p>
    );
  }

  // To not allow login route to a user who is logged in. Redirect to '/'
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login to your account
        </Typography>
        <form onSubmit={loginUser}>
          
          <Box zx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={() => {}}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LogIn
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login-company" variant="body2">
                  Login as a Company
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        
        </form>
      </Box>
    </>
  );
}

export default LoginPage;
