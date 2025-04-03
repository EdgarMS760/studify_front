import React from 'react'
import { Avatar, Box, Typography } from '@mui/material';
import MiniImg from '../atoms/MiniImg';
import TextCardAtom from '../atoms/TextCardAtom';

const UserPreview = ({ user }) => {
  // if (!user) return null;

  //const { name, image } = user;

  return (
    <>
      <MiniImg src="https://placehold.co/600x400" alt="test"/>
      <TextCardAtom text="usuario" className="text-secondaryHover text-sm"/>

    </>
  );
}

export default UserPreview
