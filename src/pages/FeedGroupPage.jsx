import React from "react";
import SideBarGroup from "@components/organisms/SideBarGroup";
import HeadBarGroup from "@components/organisms/HeadBarGroup";
import { Box, TextField, Tooltip, useTheme } from "@mui/material";
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
        message: "test",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:45 AM",
        message: "test",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:30 AM",
        message: "test",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:45 AM",
        message: "test",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:45 AM",
        message: "test",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:30 AM",
        message: "test",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:45 AM",
        message: "test",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    },
    {
        time: "10:45 AM",
        message: "test",
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
        <Box
            className={clsx(
                "flex flex-col h-full"
            )}
            sx={[
                (theme) => ({
                    backgroundColor: theme.vars.palette.secondary.main,
                }),
                (theme) =>
                    theme.applyStyles('dark', {
                        backgroundColor: "black",
                    }),
            ]}
        >
            <div className="flex-1 overflow-hidden">
                <MessagesFeed messages={dummyMessages} />
            </div>

            <Box className={clsx(
                "p-3"
            )}
            sx={[
                (theme) => ({
                    backgroundColor:  theme.vars.palette.secondary.main,
                }),
                (theme) =>
                    theme.applyStyles('dark', {
                        backgroundColor: "black",
                    }),
            ]}
            >
                <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Escribe un mensaje..."
                    multiline
                    maxRows={4}
                    variant="filled"
                    sx={
                        [
                            (theme) => ({
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "#FFFFFF",
                                    "&:hover": {
                                        backgroundColor: "#e5e7eb",
                                    }
                                }
                            }),
                            (theme) =>
                                theme.applyStyles('dark', {
                                    "& .MuiFilledInput-root": {
                                        backgroundColor: "#262626",
                                        "&:hover": {
                                            backgroundColor:"#334155" ,
                                        }
                                    },
                                }),
                        ]
                       
                    }
                  
                InputProps={{
                    endAdornment: (
                        <Tooltip title="Enviar" arrow>
                            <SendIcon
                                className="cursor-pointer mb-5 text-gray-500 hover:text-black transition-transform duration-300 ease-in-out hover:scale-150"
                            />
                        </Tooltip>
                    )
                }}
                />
            </Box>
        </Box>
    );
};

export default FeedGroupPage;


