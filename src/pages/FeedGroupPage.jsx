import React, { useState } from "react";
import { Box, TextField, Tooltip, useTheme } from "@mui/material";
import clsx from "clsx";
import MessagesFeed from "@components/organisms/MessagesFeed";
import { useSessionAuth } from "@libs/hooks/useSessionAuth";
import SendIcon from '@mui/icons-material/Send';
import { createGroupPost } from "@libs/helpers/firebaseUtils";
import { useParams } from "react-router";

const FeedGroupPage = () => {
    const theme = useTheme();
    const [text, setText] = useState("");
    const { id } = useParams();
const { session} = useSessionAuth();
    const handleSend = async () => {
        if (!text.trim()) return;
        try {
            await createGroupPost(id, text.trim(), {
                name: session?.user?.name,
                image: session?.user?.image,
            });
            setText("");
        } catch (err) {
            console.error("Error al enviar mensaje:", err);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
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
                <MessagesFeed groupId={id} />
            </div>

            <Box className={clsx(
                "p-3"
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
                <TextField
                    fullWidth
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
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
                                            backgroundColor: "#334155",
                                        }
                                    },
                                }),
                        ]
                    }
                    InputProps={{
                        endAdornment: (
                            <Tooltip title="Enviar" arrow>
                                <SendIcon
                                    onClick={handleSend}
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


