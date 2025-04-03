import React from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import FolderIcon from '@mui/icons-material/Folder';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HomeIcon from '@mui/icons-material/Home';
import { Tab, Tabs } from '@mui/material';
const ItemsToHeadBarMobile = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Tabs
            value={value}
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
            <Tab icon={<GroupsIcon />} iconPosition="start" aria-label="ALUMNOS" />
        </Tabs>
    )
}

export default ItemsToHeadBarMobile