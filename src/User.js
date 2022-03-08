import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';

const User = ({ onEdit = undefined, data, showFull = false }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {data.name[0]}
        </Avatar>
      }
      title={data.name}
      subheader={data.username}
      action={onEdit && (
        <IconButton aria-label="settings" onClick={onEdit}>
          <EditIcon />
        </IconButton>
      )
      }
    />
    <CardMedia
      component="img"
      height="194"
      image={"https://picsum.photos/seed/picsum/345/194"}
      alt={data.name}
    />
    {showFull && (
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          id: {data.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {data.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {data.address}
        </Typography>
      </CardContent>
    )}
  </Card>
);

export default User;
