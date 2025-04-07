import React from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import FolderIcon from '@mui/icons-material/Folder';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HomeIcon from '@mui/icons-material/Home';
import { Tab, Tabs } from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router';
const ItemsToHeadBarDesktop = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const tabRoutes = ["/group/:id", "/group/:id/tasks", "/group/:id/material", "/group/:id/students"];

    // Encuentra el índice actual basado en la ruta
    const currentTab = tabRoutes.indexOf(location.pathname);

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
            <Tab icon={<GroupsIcon />} iconPosition="start" label="ALUMNOS" />
        </Tabs>
    )
}

export default ItemsToHeadBarDesktop