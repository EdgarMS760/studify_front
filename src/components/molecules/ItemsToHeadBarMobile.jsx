import React from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import FolderIcon from '@mui/icons-material/Folder';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HomeIcon from '@mui/icons-material/Home';
import { Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ROUTES } from '@libs/constants/routes';
import { useAuth } from '@libs/store/AuthProvider';
const ItemsToHeadBarMobile = () => {

    const { user } = useAuth();
    const isTeacher = user?.rol === "maestro";
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const tabRoutes = [
        ROUTES.GROUP_DETAIL(id),
        ROUTES.GROUP_TASKS(id),
        ROUTES.GROUP_MATERIAL(id),
        ...(isTeacher ? [ROUTES.GROUP_STUDENTS(id)] : []),
    ];

    const patterns = [
        new RegExp(`^${ROUTES.GROUP_DETAIL(id)}$`),
        new RegExp(`^${ROUTES.GROUP_TASKS(id)}$`),
        new RegExp(`^${ROUTES.GROUP_MATERIAL(id)}$`),
        ...(isTeacher ? [new RegExp(`^${ROUTES.GROUP_STUDENTS(id)}$`)] : []),
    ];

    // Encuentra el índice actual basado en la ruta
    const currentTab = patterns.findIndex((regex) => regex.test(location.pathname));

    // Función para manejar cambios de pestaña
    const handleChange = (_, newValue) => {
        navigate(tabRoutes[newValue]); // Navega a la ruta correspondiente
    };
    return (
        <Tabs
            value={currentTab !== -1 ? currentTab : 0}
            onChange={handleChange}
            aria-label="icon label tabs example"
            textColor="inherit"
            indicatorColor="inherit"
            sx={{
                "& .MuiTabs-indicator": {
                    backgroundColor: "#808080",
                },
                "& .MuiTab-root": {
                    color: "#808080",
                    "&.Mui-selected": {
                        color: "#000000",
                        backgroundColor: "#D9D9D9",
                        borderRadius: "8px",
                    },
                },
            }}
        >
            <Tab icon={<HomeIcon />} iconPosition="start" aria-label="MURO" />
            <Tab icon={<HomeWorkIcon />} iconPosition="start" aria-label="TAREAS" />
            <Tab icon={<FolderIcon />} iconPosition="start" aria-label="MATERIAL" />
            {isTeacher && <Tab icon={<GroupsIcon />} iconPosition="start" aria-label="ALUMNOS" />}
        </Tabs>
    )
}

export default ItemsToHeadBarMobile