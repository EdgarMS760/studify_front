import React, { useEffect, useState } from "react";
import { Box, TextField, IconButton, Typography, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";
import { getActiveChatBot, postMessageChatBot } from "@services/chatbotService";
import { WELCOME_MESSAGE_STUDENT } from "@libs/constants/chatbot";


const ChatBotPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const loadChat = async () => {
            try {
                const { conversacion } = await getActiveChatBot();
                const chatMessages = conversacion?.messages || [];

                const userMessages = chatMessages.slice(1);
                setMessages([WELCOME_MESSAGE_STUDENT, ...userMessages]);

            } catch (error) {
                if (error?.response?.status === 404) {
                    setMessages([WELCOME_MESSAGE_STUDENT]);
                } else {
                    console.error("Error al cargar conversación:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        loadChat();
    }, []);

    const handleSend = async () => {
        const content = inputValue.trim();
        if (!content) return;

        const userMessage = {
            _id: Date.now().toString(),
            role: "user",
            content,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setSending(true);

        try {
            const { reply } = await postMessageChatBot({ message: content });
            const botReply = {
                _id: Date.now().toString() + "_bot",
                role: "assistant",
                content: reply,
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, botReply]);
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
        } finally {
            setSending(false);
        }
    };

    return (
        <Box className="flex flex-col h-full border rounded-md p-4 shadow-md w-full">
            <Typography variant="h6" className="mb-4">
                Chatbot
            </Typography>
            <Box className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
                {loading ? (
                    <CircularProgress />
                ) : (
                    messages.map((msg) => (
                        <Box
                            key={msg._id}
                            display="flex"
                            justifyContent={msg.role === "user" ? "flex-end" : "flex-start"}
                        >
                            <Box
                                sx={(theme) => ({
                                    backgroundColor:
                                        msg.role === "user"
                                            ? theme.vars.palette.primary.main
                                            : theme.vars.palette.secondary.main,
                                    p: 1.5,
                                    borderRadius: 2,
                                    maxWidth: "80%",
                                    wordBreak: "break-word",
                                })}
                            >
                                <Typography variant="body2" className="mb-1" sx={{ fontWeight: "bold" }}>
                                    {msg.content}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {dayjs(msg.timestamp).format("HH:mm")}
                                </Typography>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>

            <Box className="flex items-center gap-2">
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Escribe tu mensaje..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <IconButton color="primary" onClick={handleSend} disabled={sending}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChatBotPage;
