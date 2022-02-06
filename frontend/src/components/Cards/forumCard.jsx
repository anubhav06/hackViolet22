import * as React from 'react';
/* import { styled } from '@mui/material/styles'; */
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import createTheme from '@mui/material/styles/createTheme';
import red from '@mui/material/colors/red';
// import blue from '@mui/material/colors/blue';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
// import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
// const themee = createTheme({
//   palette: {
//     primary: blue,
//     secondary: {
//       main: '#304ffe',
//     },
//   },
// });
/* 
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
})); */

function CardContainer({
  forumTitle,
  datePosted,
  content,
  likes,
  numComments,
}) {
  /*   const [expanded, setExpanded] = React.useState(false); */

  const { authTokens } = useContext(AuthContext);
  const history = useHistory();

  /*  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 */
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

  return (
    <div>
      <Card
        sx={{
          maxWidth: 800,
          mx: 4,
          my: 8 /* backgroundColor: 'secondary.main' */,
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {forumTitle[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={forumTitle}
          subheader={datePosted}
        />
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {/* <CardMedia

        component="img"
        height="150"
        image={img2}
        alt="Paella dish"
        sx={{ m: 0.5 }}
      /> */}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          </CardContent>
        </Box>

        <CardActions disableSpacing>
          <IconButton aria-label="like">
            <FavoriteBorderOutlinedIcon color="primary" />
          </IconButton>

          {/* <IconButton aria-label="like">
            <FavoriteIcon color="primary" />
          </IconButton> */}

          <IconButton aria-label="comment">
            <ChatBubbleOutlineOutlinedIcon color="primary" />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon color="primary" />
          </IconButton>
          {/*  <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore> */}
        </CardActions>
        <div className="likesComments">
          {likes} {numComments}
        </div>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse> */}
      </Card>
    </div>
  );
}

export default CardContainer;
