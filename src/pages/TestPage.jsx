import React, { useState } from 'react'
import TextCardAtom from '../components/atoms/TextCardAtom';
import MiniImg from '../components/atoms/MiniImg';
import CardSideBarGroup from '../components/molecules/CardSideBarGroup';
import SideBarGroup from '../components/organisms/SideBarGroup';
import { Button } from '@mui/material';

const TestPage = () => {
  const mockData = [
    { id: 1, image: "https://via.placeholder.com/50", text: "Usuario 1" },
    { id: 2, image: "https://via.placeholder.com/50", text: "Usuario 2" },
    { id: 3, image: "https://via.placeholder.com/50", text: "Usuario 3" },
  ];
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
     
    </>
  )
}

export default TestPage;