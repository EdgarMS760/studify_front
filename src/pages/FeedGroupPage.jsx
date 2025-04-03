import React from "react";
import SideBarGroup from "@components/organisms/SideBarGroup";
import HeadBarGroup from "@components/organisms/HeadBarGroup";
import { TextField, useTheme } from "@mui/material";
import clsx from "clsx";
import MessagesFeed from "@components/organisms/MessagesFeed";

const mockData = [
    { id: 1, image: "https://placehold.co/600x400", text: "grupo 1" },
    { id: 2, image: "https://placehold.co/600x400", text: "grupo 2" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
];
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
                "h-screen flex [@media(min-width:1348px)]:flex-row overflow-hidden",
                theme.palette.mode === "dark" ? "bg-black" : "bg-secondary"
            )}
        >
            {/* este se oculta si pantalla es >= 1348px */}
            <div className="hidden [@media(min-width:1348px)]:block h-full">
                <SideBarGroup items={mockData} />
            </div>

            <div className="flex flex-col flex-1 h-full">
                <HeadBarGroup />

                <div className="flex-1 overflow-y-auto">
                    <MessagesFeed messages={dummyMessages} />
                </div>
            </div>
        </div>
    );
};

export default FeedGroupPage;

