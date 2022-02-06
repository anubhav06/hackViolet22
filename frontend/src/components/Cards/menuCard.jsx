import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function MenuCard() {
  const topics = [
    ' Mental Health',
    ' Education',
    ' Music',
    ' Motivation',
    'Business',
    'Opportunities',
  ];
  const forumMenuItems = topics.map((item) => (
    <Typography
      key={item}
      sx={{ mx: 2, my: 4 }}
      variant="h5"
      color="text.secondary"
      align="center"
    >
      {item}
    </Typography>
  ));

  return (
    <Card sx={{ maxWidth: 475 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom component="div" align="center" variant="h3">
            Menu
          </Typography>
          {forumMenuItems}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
