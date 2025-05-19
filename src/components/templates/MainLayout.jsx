
import React, { useCallback, useEffect, useState } from 'react';
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
import { Button, Avatar, Typography, Popover, Box, FormControlLabel, useMediaQuery } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useAuth } from '@libs/store/AuthProvider';
import { createTheme, styled, useColorScheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useNavigationMUI } from '@libs/store/NavigationContext';
import AssistantIcon from '@mui/icons-material/Assistant';
const MainLayout = () => {
    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff',
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: '#aab4be',
                    ...theme.applyStyles('dark', {
                        backgroundColor: '#8796A5',
                    }),
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: '#ffc532',//001e3c
            width: 32,
            height: 32,
            '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
            ...theme.applyStyles('dark', {
                backgroundColor: '#003892',
            }),
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: '#aab4be',
            borderRadius: 20 / 2,
            ...theme.applyStyles('dark', {
                backgroundColor: '#8796A5',
            }),
        },
    }));
    const { session, authentication } = useSessionAuth();


    const { user } = useAuth();
    const isTeacher = user?.rol === "maestro";

const fullName = session?.user?.name || 'Usuario';
const firstWord = fullName.split(" ")[0];
const shortName = firstWord.length > 10 ? firstWord.slice(0, 10) : firstWord;

const userData = {
    name: fullName,
    shortName,
    avatar: session?.user?.image || '',
    email: session?.user?.email || '',
};

    const NAVIGATION = isTeacher ?
        [
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
                segment: 'studimate',
                title: 'Studimate',
                icon: <AssistantIcon />,
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
        ] : [{
            segment: 'groups',
            title: 'Grupo',
            icon: <GroupsIcon />,
        }, {
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
            segment: 'studimate',
            title: 'Studimate',
            icon: <AssistantIcon />,
        },
        {
            kind: 'header',
            title: 'Configuración',
        },
        {
            segment: 'settings',
            title: 'Datos de usuario',
            icon: <ManageAccountsIcon />,
        },];



    function userSessionLayout() {
        const { mode, setMode } = useColorScheme();
        const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

        const getEffectiveMode = () => {
            if (mode === 'system') {
                return prefersDarkMode ? 'dark' : 'light';
            }
            return mode;
        };
        const [isDarkMode, setIsDarkMode] = useState(getEffectiveMode() === 'dark');

        useEffect(() => {
            setIsDarkMode(getEffectiveMode() === 'dark');
        }, [mode, prefersDarkMode]);

        const handleToggle = useCallback((event) => {
            const newMode = event.target.checked ? 'dark' : 'light';
            setMode(newMode);
        }, [setMode]);

        const [anchorEl, setAnchorEl] = useState(null);

        const handlePopoverOpen = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handlePopoverClose = () => {
            setAnchorEl(null);
        };
        const onLogout = () => {
            authentication.signOut();
        }
        const open = Boolean(anchorEl);
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FormControlLabel
                    control={<MaterialUISwitch checked={isDarkMode} onChange={handleToggle} sx={{ m: 1 }} />}
                />
                <Box
                    onClick={handlePopoverOpen}
                    className='hover:bg-secondary p-1 rounded-md'
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 8 }}
                    sx={[
                        (theme) => ({
                            '&:hover': {
                                backgroundColor: theme.vars.palette.secondary.main,
                            },
                        }),
                        (theme) =>
                            theme.applyStyles('dark', {
                                '&:hover': {
                                    backgroundColor: theme.vars.palette.secondary.main,
                                },
                            }),
                    ]}
                >
                    <Avatar src={userData.avatar} alt={userData.name} sx={{ width: 32, height: 32 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {userData.shortName}
                    </Typography>
                </Box>

                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    PaperProps={{
                        sx: { p: 2, width: 220 },
                    }}
                >
                    <Typography variant="subtitle1" fontWeight={600}>
                        {userData.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {userData.email}
                    </Typography>
                    <Button
                        variant="contained"
                        color="info"
                        size="small"
                        fullWidth
                        sx={{ mb: 1 }}
                        onClick={() => location.href = "/settings"}
                    >
                        Configuracion
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        fullWidth
                        onClick={onLogout}
                    >
                        Cerrar sesión
                    </Button>
                </Popover>
            </div>
        );
    }
    const { hideNavigation } = useNavigationMUI();
    return (
        <AppProvider
            navigation={NAVIGATION}
            theme={theme}
            branding={{
                logo: <img src={logo} alt="Logo" />,
                title: '',
                homeUrl: '/',
            }}
        >
            <DashboardLayout
                slots={{
                    toolbarActions: userSessionLayout
                }}
                hideNavigation={hideNavigation}
            >
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
