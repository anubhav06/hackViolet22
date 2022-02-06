import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import createTheme from '@mui/material/styles/createTheme';
import red from '@mui/material/colors/red';
// import blue from '@mui/material/colors/blue';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
// import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CardContainer({
  forumTitle,
  datePosted,
  content,
  likes,
  numComments,
  id,
  comments,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const { authTokens } = useContext(AuthContext);
  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
          my: 8,
          /* backgroundColor: 'secondary.main', */
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
          <form onSubmit={like}>
            <input name="postID" defaultValue={id} hidden />
            <IconButton aria-label="like" type="submit">
              <Badge badgeContent={likes} color="primary">
                <FavoriteBorderOutlinedIcon color="primary" />
              </Badge>
            </IconButton>
          </form>

          {/* <IconButton aria-label="like">
            <FavoriteIcon color="primary" />
          </IconButton> */}

          <IconButton aria-label="comment">
            <Badge badgeContent={numComments} color="primary">
              <ChatBubbleOutlineOutlinedIcon color="primary" />
            </Badge>
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon color="primary" />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comments:</Typography>
            {!numComments ? 'There are no comments to display!' : 'Well said!'}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default CardContainer;
