import React from "react";
import SideBarGroup from "../components/organisms/SideBarGroup";
import HeadBarGroup from "../components/organisms/HeadBarGroup";
import { useTheme } from "@mui/material";
import clsx from "clsx";

const mockData = [
    { id: 1, image: "https://placehold.co/600x400", text: "grupo 1" },
    { id: 2, image: "https://placehold.co/600x400", text: "grupo 2" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
];

const FeedGroupPage = () => {
    const theme = useTheme();

    return (
        <div
            className={clsx(
                "[@media(min-width:1348px)]:flex flex-row max-h-screen overflow-hidden",
                theme.palette.mode === "dark" ? "bg-black" : "bg-secondary"
            )}
        >
            {/* este se oculta si pantalla es >= 1348px */}
            <div className="flex hidden [@media(min-width:1348px)]:block h-full">
                <SideBarGroup items={mockData} />
            </div>

            <div className="">
                <HeadBarGroup />
            </div>
        </div>
    );
};

export default FeedGroupPage;
