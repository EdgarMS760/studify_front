import React from "react";
import SideBarGroup from "@components/organisms/SideBarGroup";
import HeadBarGroup from "@components/organisms/HeadBarGroup";
import { TextField, useTheme } from "@mui/material";
import clsx from "clsx";
import MessagesFeed from "@components/organisms/MessagesFeed";


const dummyMessages = [
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
    // {
    //     time: "10:45 AM",
    //     message: "q roio",
    //     user: { name: "edgar", img: "https://via.placeholder.com/50" }
    // },
    // {
    //     time: "10:30 AM",
    //     message: "ewe",
    //     user: { name: "edgar", img: "https://via.placeholder.com/50" }
    // },
    // {
    //     time: "10:45 AM",
    //     message: "q we",
    //     user: { name: "edgar", img: "https://via.placeholder.com/50" }
    // },
    // {
    //     time: "10:45 AM",
    //     message: "q roio",
    //     user: { name: "edgar", img: "https://via.placeholder.com/50" }
    // },
    {
        time: "11:00 AM",
        message: "q roio de q",
        user: { name: "edgar", img: "https://via.placeholder.com/50" }
    }
];
const FeedGroupPage = () => {
    const theme = useTheme();

    return (
        <div
            className={clsx(
                "max-h-[90vh]", // Permite que se ajuste al espacio disponible
                theme.palette.mode === "dark" ? "bg-black" : "bg-secondary"
            )}
        >
            {/* Asegura que MessagesFeed ocupe todo el espacio sin causar scroll innecesario */}
            <MessagesFeed messages={dummyMessages} />
        </div>
    );
};

export default FeedGroupPage;


