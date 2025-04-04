import { Outlet } from "react-router-dom";
import HeadBarGroup from "@components/organisms/HeadBarGroup";
import clsx from "clsx";
import { useTheme } from "@mui/material";
import SideBarGroup from "@components/organisms/SideBarGroup";

const GroupLayout = () => {
    const theme = useTheme();
    const mockData = [
        { id: 1, image: "https://placehold.co/600x400", text: "grupo 1" },
        { id: 2, image: "https://placehold.co/600x400", text: "grupo 2" },
        { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    ];
    return (
        <div className="flex flex-col overflow-hidden max-h-[90vh] max-w-screen">

            <div
                className={clsx(
                    "h-full flex [@media(min-width:<1348px>)]:flex-rown",
                    theme.palette.mode === "dark" ? "bg-black" : "bg-secondary"
                )}
            >
                {/* este se oculta si pantalla es >= 1348px */}
                <div className="hidden [@media(min-width:1348px)]:block h-full">
                    <SideBarGroup items={mockData} />
                </div>

                <div className="flex flex-col h-full">
                    <HeadBarGroup />

                    {/* Aseguramos que Outlet tenga espacio y sea scrollable si es necesario */}
                    <div className="max-h-[80vh] overflow-y-auto">
                        <Outlet />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default GroupLayout;
