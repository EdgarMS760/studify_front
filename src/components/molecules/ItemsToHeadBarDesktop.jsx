import React from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import FolderIcon from '@mui/icons-material/Folder';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HomeIcon from '@mui/icons-material/Home';
import { Tab, Tabs } from '@mui/material';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { useAuth } from '@libs/store/AuthProvider';
import { ROUTES } from '@libs/constants/routes';
const ItemsToHeadBarDesktop = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { user } = useAuth();
    const isTeacher = user?.rol === "maestro";

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
    

    const currentTab = patterns.findIndex((regex) => regex.test(location.pathname));

    const handleChange = (_, newValue) => {
        navigate(tabRoutes[newValue]);
    };
    return (
        <Tabs
            value={currentTab !== -1 ? currentTab : false}
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
                    minWidth: "160px",
                    fontSize: "16px",
                    padding: "10px",
                    transition: "all 0.3s ease-in-out",

                    "&.Mui-selected": {
                        color: "#000000",
                        backgroundColor: "#D9D9D9",
                        borderRadius: "8px",
                    },

                    "@media (max-width: 1500px)": {
                        minWidth: "130px",
                        fontSize: "15px",
                    },

                    "@media (max-width: 1400px)": {
                        minWidth: "120px",
                        fontSize: "14px",
                    },
                    "@media (max-width: 1370px)": {
                        minWidth: "120px",
                        fontSize: "14px",
                    },

                    "@media (max-width: 1250px)": {
                        minWidth: "120px",
                        fontSize: "13px",
                    },

                    "@media (max-width: 1170px)": {
                        minWidth: "120px",
                        fontSize: "12px",
                    },
                },
            }}
        >
            <Tab icon={<HomeIcon />} iconPosition="start" label="MURO" />
            <Tab icon={<HomeWorkIcon />} iconPosition="start" label="TAREAS" />
            <Tab icon={<FolderIcon />} iconPosition="start" label="MATERIAL" />
            {isTeacher && <Tab icon={<GroupsIcon />} iconPosition="start" label="ALUMNOS" />}
        </Tabs>
    )
}

export default ItemsToHeadBarDesktop