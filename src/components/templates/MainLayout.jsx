
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

const MainLayout = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [userData, setUserData] = useState({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        profileImage: session?.user?.profileImage || '',
    });

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSaveChanges = () => {
        // Aquí guardarías los cambios (por ejemplo, hacer una llamada a la API para actualizar el perfil)
        console.log('Datos actualizados:', userData);
        setOpenModal(false); // Cierra el modal después de guardar los cambios
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData((prevData) => ({
                    ...prevData,
                    profileImage: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const wrappedAuthentication = {
        ...authentication,
        signOut: () => {
            authentication.signOut();
            navigate('/login');
        },
        editUser: handleOpenModal, // Muestra el modal de edición
    };

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
            kind: 'divider',
        },
        {
            segment: 'reports',
            title: 'Reportes',
            icon: <BarChartIcon />,
            children: [
                {
                    segment: 'attendance',
                    title: 'Asistencia',
                    icon: <Diversity3Icon />,
                },
                {
                    segment: 'homework',
                    title: 'Tareas',
                    icon: <DescriptionIcon />,
                },
                {
                    segment: 'performance',
                    title: 'Desempeño',
                    icon: <AutoGraphIcon />,
                },
            ],
        },
        {
            kind: 'divider',
        },
        {
            segment: 'calendar',
            title: 'Calendario',
            icon: <CalendarMonthIcon />,
        },
        {
            kind: 'divider',
        },
        {
            segment: 'homework',
            title: 'Tareas',
            icon: <HomeWorkIcon />,
        },
    ];

    const { session, authentication } = useSessionAuth();

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
                <div style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem', position:'fixed', transform:'translate(0%, -95%)', zIndex:'5000', right:100}}>
                    <Button
                    
                        variant="contained"
                        color="primary"
                        onClick={handleOpenModal}
                        style={{ borderRadius: '6px', backgroundColor:'#FD841F' }}
                    >
                        Editar Usuario
                    </Button>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Outlet />
                </LocalizationProvider>

                {/* Modal para editar el usuario */}
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>Editar Perfil</DialogTitle>
                    <DialogContent>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <input
                                accept="image/*"
                                id="profile-image-upload"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleProfileImageChange}
                            />
                            <label htmlFor="profile-image-upload">
                                <IconButton color="primary" component="span">
                                    <PhotoCameraIcon />
                                </IconButton>
                            </label>
                            {userData.profileImage && (
                                <img
                                    src={userData.profileImage}
                                    alt="Foto de perfil"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '1rem' }}
                                />
                            )}
                            <TextField
                                label="Nombre"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Correo"
                                name="email"
                                type="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={handleSaveChanges} color="primary">
                            Guardar
                        </Button>
                    </DialogActions>
                </Dialog>
            </DashboardLayout>
        </AppProvider>
    );
};

export default MainLayout;
