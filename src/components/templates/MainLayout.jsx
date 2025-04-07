
import React, { useState } from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import logo from '@assets/Logo.png'
import { Outlet, useNavigate } from 'react-router';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import theme from '@styles/Theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useSessionAuth } from '@libs/hooks/useSessionAuth';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
const MainLayout = () => {

    const { session, authentication } = useSessionAuth();


    const NAVIGATION = [
        // {
        //     kind: 'header',
        //     title: 'Main items',
        // },
        // {
        //     segment: 'dashboard',
        //     title: 'Dashboard',
        //     icon: <DashboardIcon />,
        // },

        {
            segment: 'groups',
            title: 'Grupos',
            icon: <GroupsIcon />,
        },
        {
            segment: 'reports',
            title: 'Reportes',
            icon: <BarChartIcon />,
            // children: [
            //     {
            //         segment: 'attendance',
            //         title: 'Asistencia',
            //         icon: <Diversity3Icon />,
            //     },
            //     {
            //         segment: 'homework',
            //         title: 'Tareas',
            //         icon: <DescriptionIcon />,
            //     },
            //     {
            //         segment: 'performance',
            //         title: 'Desempeño',
            //         icon: <AutoGraphIcon />,
            //     },
            // ],
        },
        {
            segment: 'calendar',
            title: 'Calendario',
            icon: <CalendarMonthIcon />,
        },
        {
            segment: 'homework',
            title: 'Tareas',
            icon: <HomeWorkIcon />,
        },
        {
            kind: 'header',
            title: 'Configuración',
        },
        {
            segment: 'settings',
            title: 'Datos de usuario',
            icon: <ManageAccountsIcon />,
        },
    ];


    return (
        <AppProvider
            navigation={NAVIGATION}
            session={session}
            authentication={authentication}
            theme={theme}
            branding={{
                logo: <img src={logo} alt="Logo" />,
                title: '',
                homeUrl: '/',
            }}
        >
            <DashboardLayout>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem', position: 'fixed', transform: 'translate(0%, -95%)', zIndex: '5000', right: 100 }}>
                    {/* */}
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Outlet />
                </LocalizationProvider>


            </DashboardLayout>
        </AppProvider>
    );
};

export default MainLayout;
