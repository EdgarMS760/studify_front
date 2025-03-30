import React from 'react'
import { Avatar, Box, Typography } from '@mui/material';

const UserPreview = ({user}) => {
    if (!user) return null;

    const { name, image } = user;
  
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar src={image} alt={name} />
        <Typography variant="body1">{name}</Typography>
      </Box>
    );
}

export default UserPreview
