import React from "react";
import SideBarGroup from "../components/organisms/SideBarGroup";

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
    return (
        <div className="">
            <div className="flex hidden lg:block ">
                <SideBarGroup items={mockData} />
            </div>

            <main className="flex justify-center items-center ">
                <h1>Contenido Principal</h1>
            </main>
        </div>
    );
};

export default FeedGroupPage;
