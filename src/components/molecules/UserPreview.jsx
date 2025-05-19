import React from 'react'
import { Avatar, Box, Typography } from '@mui/material';
import MiniImg from '../atoms/MiniImg';
import TextCardAtom from '../atoms/TextCardAtom';

const UserPreview = ({ user }) => {
  // if (!user) return null;

  //const { name, image } = user;

  return (
    <div className="flex flex-col items-center justify-end space-x-2">
      <MiniImg src={user.image} alt="test"/>
      <TextCardAtom text={user.name} className="text-secondaryHover text-sm"/>

    </div>
  );
}

export default UserPreview
