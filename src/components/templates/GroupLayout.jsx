import { Outlet } from "react-router-dom";
import HeadBarGroup from "@components/organisms/HeadBarGroup";
import clsx from "clsx";
import { Box, useTheme } from "@mui/material";
import SideBarGroup from "@components/organisms/SideBarGroup";

const GroupLayout = () => {
    const theme = useTheme();
    const mockData = [
        { id: 1, image: "https://placehold.co/600x400", text: "grupo 1" },
        { id: 2, image: "https://placehold.co/600x400", text: "grupo 2" },
        { id: 3, image: "https://placehold.co/600x400", text: "grupo 3" },
    ];
    return (
        <div className="flex flex-col overflow-hidden min-h-full">

            <Box
                className={clsx(
                    "h-full flex [@media(min-width:<1348px>)]:flex-row"
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
                {/* este se oculta si pantalla es <= 1348px */}
                <div className="hidden [@media(min-width:1348px)]:block h-full">
                    <SideBarGroup items={mockData} />
                </div>
                
                <div className="flex flex-col h-full w-full">
                    <HeadBarGroup />

                    <div className="flex-1 overflow-y-auto">
                        <Outlet />
                    </div>
                </div>

            </Box>

        </div>
    );
};

export default GroupLayout;
