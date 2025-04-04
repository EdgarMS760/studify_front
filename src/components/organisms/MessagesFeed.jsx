import React from 'react';
import CardFeedMessage from '@components/molecules/CardFeedMessage';
import { TextField, Tooltip, useTheme } from '@mui/material';
import clsx from 'clsx';
import SendIcon from '@mui/icons-material/Send';
const MessagesFeed = ({ messages = [] }) => {
    const theme = useTheme();

    return (
        <div className="h-screen flex flex-col rounded-lg m-3">
            {/* Contenedor de Mensajes con Scroll */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((msg, index) => (
                    <CardFeedMessage key={index} msgObj={msg} />
                ))}
            </div>

            {/* Input para Enviar Mensajes */}
            <div className={clsx("p-3", theme.palette.mode === 'dark' ? 'bg-black' : 'bg-secondary')}>
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

export default MessagesFeed;