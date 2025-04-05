import React from "react";
import SideBarGroup from "@components/organisms/SideBarGroup";
import HeadBarGroup from "@components/organisms/HeadBarGroup";
import { TextField, Tooltip, useTheme } from "@mui/material";
import clsx from "clsx";
import MessagesFeed from "@components/organisms/MessagesFeed";

import SendIcon from '@mui/icons-material/Send';

const dummyMessages = [
    {
        time: "10:30 AM",
        message: "primero",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:45 AM",
        message: "q we",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:45 AM",
        message: "q roio",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:30 AM",
        message: "ewe",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:45 AM",
        message: "q we",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:45 AM",
        message: "q roio",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:30 AM",
        message: "ewe",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:45 AM",
        message: "q we",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:45 AM",
        message: "q roio",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "11:00 AM",
        message: "ultimo",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    }
];
const FeedGroupPage = () => {
    const theme = useTheme();

    return (
        <div
            className={clsx(
                "flex flex-col h-full",
                theme.palette.mode === "dark" ? "bg-black" : "bg-secondary"
            )}
        >
            <div className="flex-1 overflow-hidden">
                <MessagesFeed messages={dummyMessages} />
            </div>

            <div className={clsx(
                "p-3 border-t",
                theme.palette.mode === 'dark'
                    ? 'bg-black border-gray-700'
                    : 'bg-secondary border-gray-300'
            )}>
                <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Escribe un mensaje..."
                    multiline
                    maxRows={4}
                    variant="filled"
                    sx={{
                        "& .MuiFilledInput-root": {
                            backgroundColor: theme.palette.mode === "dark" ? "#262626" : "#FFFFFF",
                            "&:hover": {
                                backgroundColor: theme.palette.mode === "dark" ? "#334155" : "#e5e7eb",
                            }
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <Tooltip title="Enviar" arrow>
                                <SendIcon
                                    className="cursor-pointer text-gray-500 hover:text-black transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                            </Tooltip>
                        )
                    }}
                />
            </div>
        </div>
    );
};

export default FeedGroupPage;


