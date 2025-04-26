import React from 'react'
import { Avatar, Box, Typography } from '@mui/material';
import MiniImg from '../atoms/MiniImg';
import TextCardAtom from '../atoms/TextCardAtom';

const UserPreview = ({ user }) => {
  // if (!user) return null;

  //const { name, image } = user;

  return (
    <>
      <MiniImg src={user.image} alt="test"/>
      <TextCardAtom text={user.name} className="text-secondaryHover text-sm"/>

    </>
  );
}

export default UserPreview
